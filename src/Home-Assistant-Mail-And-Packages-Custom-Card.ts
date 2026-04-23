/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { CSSResultGroup, TemplateResult, PropertyValues } from 'lit';
import { HomeAssistant, LovelaceCardEditor, getLovelace, fireEvent } from 'custom-card-helpers';

import './editor';
import './compact-card';
import type { MailAndPackagesCardConfig, CarrierEntityConfig } from './types';
import { CARD_VERSION, HACS_FILES_BASE } from './const';
import { CARRIERS, CarrierDefinition, CarrierSensorType, getCarrierSensorImage } from './carriers';
import { localize } from './localize/localize';

/* eslint no-console: 0 */
console.info(
  `%c  MAIL AND PACKAGES CARD \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'mailandpackages-card',
  name: 'Mail and Packages Card',
  preview: true,
  description: 'A custom companion card for the Mail and Packages integration.',
});

const FALLBACK_IMG = `${HACS_FILES_BASE}/img/square_delivery.png`;

@customElement('mailandpackages-card')
export class MailandpackagesCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('mailandpackages-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): object {
    return {
      name: 'Mail and Packages',
      carriers: {},
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: MailAndPackagesCardConfig;

  public setConfig(config: MailAndPackagesCardConfig): void {
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }
    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }
    this.config = { name: 'Mail and Packages', ...config };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) return false;
    return changedProps.has('config') || changedProps.has('hass');
  }

  protected render(): TemplateResult | void {
    if (this.config.show_warning) {
      return this._showWarning(localize('common.show_warning'));
    }

    const mailUpdated = this.config.entity_mail_updated ? this.hass.states[this.config.entity_mail_updated] : undefined;

    const inTransit = this.config.entity_packages_in_transit
      ? this.hass.states[this.config.entity_packages_in_transit]
      : undefined;

    const delivered = this.config.entity_packages_delivered
      ? this.hass.states[this.config.entity_packages_delivered]
      : undefined;

    const deliveryMsg = this.config.entity_delivery_message
      ? this.hass.states[this.config.entity_delivery_message]
      : undefined;

    const carriers = this.config.carriers || {};

    return html`
      <ha-card class="mail-and-packages" tabindex="0">
        ${this._renderHeader(mailUpdated)} ${this._renderSummary(inTransit, delivered)}
        ${deliveryMsg ? html`<p class="delivery-message">${deliveryMsg.state}</p>` : ''}
        <div class="carriers">${CARRIERS.map((carrier) => this._renderCarrier(carrier, carriers[carrier.key]))}</div>
      </ha-card>
    `;
  }

  private _renderHeader(mailUpdated: any): TemplateResult {
    let lastCheck = '';
    if (mailUpdated?.state && mailUpdated.state !== 'unavailable' && mailUpdated.state !== 'unknown') {
      try {
        lastCheck = new Date(mailUpdated.state).toLocaleString();
      } catch {
        lastCheck = mailUpdated.state;
      }
    }

    return html`
      <div class="card-header-area">
        ${this.config.name ? html`<div class="card-title">${this.config.name}</div>` : ''}
        ${lastCheck ? html`<div class="last-updated">${localize('common.last_check')}: ${lastCheck}</div>` : ''}
      </div>
    `;
  }

  private _renderSummary(inTransit: any, delivered: any): TemplateResult {
    if (!inTransit && !delivered) return html``;
    return html`
      <div class="summary-row">
        ${inTransit
          ? html`
              <div class="summary-badge" title="${localize('common.in_transit')}">
                <div class="badge-icon-wrap">
                  <img
                    class="badge-img"
                    src="${HACS_FILES_BASE}/img/square_in-transit.png"
                    alt="${localize('common.in_transit')}"
                    @error=${this._onImgError}
                  />
                  <span class="badge-count">${inTransit.state}</span>
                </div>
                <span class="badge-label">${localize('common.in_transit')}</span>
              </div>
            `
          : ''}
        ${delivered
          ? html`
              <div class="summary-badge" title="${localize('common.delivered')}">
                <div class="badge-icon-wrap">
                  <img
                    class="badge-img"
                    src="${HACS_FILES_BASE}/img/square_delivery.png"
                    alt="${localize('common.delivered')}"
                    @error=${this._onImgError}
                  />
                  <span class="badge-count">${delivered.state}</span>
                </div>
                <span class="badge-label">${localize('common.delivered')}</span>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _renderCarrier(carrier: CarrierDefinition, carrierCfg: CarrierEntityConfig | undefined): TemplateResult {
    if (!carrierCfg) return html``;

    const configuredSensors = carrier.sensors.filter((s) => carrierCfg[s.configKey]);

    // Safe camera access — only when configured AND state exists with entity_picture
    const cameraState = carrierCfg.entity_camera ? this.hass.states[carrierCfg.entity_camera] : undefined;
    const cameraUrl = cameraState?.attributes?.entity_picture as string | undefined;

    // Honour "only show camera when a package was delivered today"
    const deliveredCount = carrierCfg.entity_delivered
      ? parseInt(this.hass.states[carrierCfg.entity_delivered]?.state ?? '0', 10)
      : 0;
    const showCamera = !!cameraUrl && (!carrierCfg.camera_only_when_delivered || deliveredCount > 0);

    if (configuredSensors.length === 0 && !showCamera) return html``;

    const headerLink = carrier.key === 'amazon' && carrierCfg.amazon_url ? carrierCfg.amazon_url : carrier.url;

    return html`
      <div class="carrier-section">
        <div class="carrier-header">
          ${headerLink
            ? html`<a class="carrier-name" href="${headerLink}" target="_blank" rel="noopener noreferrer"
                >${carrier.name}</a
              >`
            : html`<span class="carrier-name">${carrier.name}</span>`}
        </div>
        ${showCamera
          ? html`
              <img
                class="delivery-camera"
                src="${cameraUrl!}&interval=30"
                alt="${carrier.name} delivery camera"
                @click=${() => this._showMoreInfo(carrierCfg.entity_camera!)}
              />
            `
          : ''}
        <div class="carrier-sensors">
          ${configuredSensors.map((sensor) => this._renderSensorBadge(carrier, sensor, carrierCfg))}
        </div>
      </div>
    `;
  }

  private _renderSensorBadge(
    carrier: CarrierDefinition,
    sensor: CarrierSensorType,
    carrierCfg: CarrierEntityConfig,
  ): TemplateResult {
    const entityId = carrierCfg[sensor.configKey] as string | undefined;
    if (!entityId) return html``;

    const entityState = this.hass.states[entityId];
    if (!entityState) return html``;

    const imgPath = getCarrierSensorImage(carrier, sensor.key);
    const imgSrc = `${HACS_FILES_BASE}/${imgPath}`;

    return html`
      <div class="sensor-badge" title="${sensor.label}: ${entityState.state}">
        <div class="badge-icon-wrap">
          <img class="badge-img" src="${imgSrc}" alt="${carrier.name} ${sensor.label}" @error=${this._onImgError} />
          <span class="badge-count">${entityState.state}</span>
        </div>
        <span class="badge-label">${sensor.label}</span>
      </div>
    `;
  }

  private _showMoreInfo(entityId: string): void {
    fireEvent(this, 'hass-more-info', { entityId });
  }

  private _onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement;
    // img.src is always the resolved absolute URL; FALLBACK_IMG is a root-relative path.
    // Compare with endsWith so both forms match and we avoid an infinite onerror loop.
    if (!img.src.endsWith(FALLBACK_IMG)) {
      img.src = FALLBACK_IMG;
    }
  }

  private _showWarning(warning: string): TemplateResult {
    return html`<hui-warning>${warning}</hui-warning>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      .mail-and-packages {
        padding: 0;
      }

      /* ── Header ── */
      .card-header-area {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        padding: 12px 16px 8px;
        border-bottom: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      .card-title {
        font-size: 1.1rem;
        font-weight: 500;
        color: var(--primary-text-color);
      }

      .last-updated {
        font-size: 0.7rem;
        color: var(--secondary-text-color);
      }

      /* ── Summary row ── */
      .summary-row {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 24px;
        padding: 12px 16px 4px;
      }

      /* ── Delivery message ── */
      .delivery-message {
        margin: 0;
        padding: 6px 16px 10px;
        font-size: 0.875rem;
        color: var(--secondary-text-color);
      }

      /* ── Carriers container ── */
      .carriers {
        padding: 0 0 8px;
      }

      /* ── Carrier section ── */
      .carrier-section {
        padding: 10px 16px 4px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      .carrier-header {
        margin-bottom: 8px;
      }

      .carrier-name {
        font-size: 0.78rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        text-decoration: none;
      }

      a.carrier-name:hover {
        color: var(--primary-color);
      }

      /* ── Camera ── */
      .delivery-camera {
        width: 100%;
        height: auto;
        border-radius: 4px;
        margin-bottom: 8px;
        cursor: pointer;
        display: block;
      }

      /* ── Sensor badges row ── */
      .carrier-sensors {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        gap: 12px;
        padding: 4px 0 8px;
      }

      /* ── Individual badge ── */
      .sensor-badge,
      .summary-badge {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: default;
      }

      .badge-icon-wrap {
        position: relative;
        width: 2.5rem;
        height: 2.5rem;
      }

      .badge-img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        object-fit: cover;
        display: block;
      }

      .badge-count {
        position: absolute;
        bottom: -4px;
        right: -6px;
        background-color: var(--card-background-color, var(--secondary-background-color));
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.2));
        border-radius: 10px;
        font-size: 0.65rem;
        font-weight: 600;
        min-width: 1.15rem;
        height: 1.15rem;
        line-height: 1.15rem;
        text-align: center;
        padding: 0 3px;
        color: var(--primary-text-color);
        box-sizing: border-box;
      }

      .badge-label {
        font-size: 0.6rem;
        color: var(--secondary-text-color);
        margin-top: 6px;
        text-align: center;
        max-width: 4.5rem;
        white-space: normal;
        word-break: break-word;
        line-height: 1.2;
      }

      /* ── Footer version ── */
      .footer {
        padding: 4px 16px 8px;
        text-align: right;
        font-size: 0.65rem;
        color: var(--disabled-text-color, var(--secondary-text-color));
      }
    `;
  }
}
