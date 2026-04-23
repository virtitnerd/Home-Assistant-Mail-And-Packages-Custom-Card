/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { CSSResultGroup, TemplateResult, PropertyValues } from 'lit';
import { HomeAssistant, LovelaceCardEditor, fireEvent } from 'custom-card-helpers';

import type { MailAndPackagesCardConfig } from './types';
import { CARD_VERSION, HACS_FILES_BASE } from './const';
import { CARRIERS } from './carriers';
import { localize } from './localize/localize';

const FALLBACK_IMG = `${HACS_FILES_BASE}/img/square_delivery.png`;

(window as any).customCards = (window as any).customCards || [];
if (!(window as any).customCards.some((c: any) => c.type === 'mailandpackages-compact-card')) {
  (window as any).customCards.push({
    type: 'mailandpackages-compact-card',
    name: 'Mail and Packages (Compact)',
    preview: true,
    description: 'Minimalist view: mail count, per-carrier package totals, aggregate in-transit and delivered.',
  });
}

@customElement('mailandpackages-compact-card')
export class MailandpackagesCompactCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    // Reuse the full card's visual editor — same config schema
    return document.createElement('mailandpackages-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): object {
    return {
      name: 'Mail Summary',
      carriers: {},
    };
  }

  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private config!: MailAndPackagesCardConfig;

  public setConfig(config: MailAndPackagesCardConfig): void {
    if (!config) throw new Error(localize('common.invalid_configuration'));
    this.config = { name: 'Mail Summary', ...config };
  }

  protected shouldUpdate(changedProps: PropertyValues): boolean {
    if (!this.config) return false;
    return changedProps.has('config') || changedProps.has('hass');
  }

  protected render(): TemplateResult | void {
    const cfg = this.config;
    const states = this.hass.states;

    const mailUpdated = cfg.entity_mail_updated ? states[cfg.entity_mail_updated] : undefined;
    const inTransit = cfg.entity_packages_in_transit ? states[cfg.entity_packages_in_transit] : undefined;
    const delivered = cfg.entity_packages_delivered ? states[cfg.entity_packages_delivered] : undefined;
    const deliveryMsg = cfg.entity_delivery_message ? states[cfg.entity_delivery_message] : undefined;
    const carriers = cfg.carriers || {};

    // Build compact carrier items — mail count + package count per carrier
    const carrierItems: { image: string; label: string; count: string; entityId: string }[] = [];

    for (const carrier of CARRIERS) {
      const carrierCfg = carriers[carrier.key];
      if (!carrierCfg) continue;

      if (carrierCfg.entity_mail) {
        const s = states[carrierCfg.entity_mail];
        if (s) {
          carrierItems.push({
            image: `${HACS_FILES_BASE}/img/square_mail.png`,
            label: 'Mail',
            count: s.state,
            entityId: carrierCfg.entity_mail,
          });
        }
      }

      if (carrierCfg.entity_packages) {
        const s = states[carrierCfg.entity_packages];
        if (s) {
          carrierItems.push({
            image: `${HACS_FILES_BASE}/${carrier.image}`,
            label: carrier.name,
            count: s.state,
            entityId: carrierCfg.entity_packages,
          });
        }
      }
    }

    // USPS camera only (Informed Delivery preview image)
    const uspsCfg = carriers['usps'];
    const uspsCameraState = uspsCfg?.entity_camera ? states[uspsCfg.entity_camera] : undefined;
    const uspsCameraUrl = uspsCameraState?.attributes?.entity_picture as string | undefined;

    // Last-check timestamp
    let lastCheck = '';
    if (mailUpdated?.state && mailUpdated.state !== 'unavailable' && mailUpdated.state !== 'unknown') {
      try {
        lastCheck = new Date(mailUpdated.state).toLocaleString();
      } catch {
        lastCheck = mailUpdated.state;
      }
    }

    return html`
      <ha-card class="compact-card" tabindex="0">
        ${cfg.name ? html`<div class="compact-title">${cfg.name}</div>` : ''}
        ${inTransit || delivered
          ? html`
              <div class="compact-summary">
                ${delivered
                  ? html`
                      <span class="summary-item">
                        <img
                          class="row-icon"
                          src="${HACS_FILES_BASE}/img/square_delivery.png"
                          alt="Deliveries"
                          @error=${this._onImgError}
                        />
                        Deliveries:&nbsp;<strong>${delivered.state}</strong>
                      </span>
                    `
                  : ''}
                ${inTransit
                  ? html`
                      <span class="summary-item">
                        <img
                          class="row-icon"
                          src="${HACS_FILES_BASE}/img/square_in-transit.png"
                          alt="In Transit"
                          @error=${this._onImgError}
                        />
                        In Transit:&nbsp;<strong>${inTransit.state}</strong>
                      </span>
                    `
                  : ''}
              </div>
            `
          : ''}
        ${deliveryMsg ? html`<div class="compact-message">${deliveryMsg.state}</div>` : ''}
        ${carrierItems.length > 0
          ? html`
              <div class="compact-carriers">
                ${carrierItems.map(
                  (item) => html`
                    <span class="carrier-item" title="${item.label}: ${item.count}">
                      <img class="row-icon" src="${item.image}" alt="${item.label}" @error=${this._onImgError} />
                      ${item.label}:&nbsp;<strong>${item.count}</strong>
                    </span>
                  `,
                )}
              </div>
            `
          : ''}
        ${uspsCameraUrl
          ? html`
              <img
                class="compact-camera"
                src="${uspsCameraUrl}&interval=30"
                alt="USPS Informed Delivery"
                @click=${() => fireEvent(this, 'hass-more-info', { entityId: uspsCfg!.entity_camera! })}
              />
            `
          : ''}

        <div class="compact-footer">
          V&nbsp;${CARD_VERSION}${lastCheck ? html`&nbsp;&nbsp;Checked:&nbsp;${lastCheck}` : ''}
        </div>
      </ha-card>
    `;
  }

  private _onImgError(ev: Event): void {
    const img = ev.target as HTMLImageElement;
    if (!img.src.endsWith(FALLBACK_IMG)) {
      img.src = FALLBACK_IMG;
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      .compact-card {
        padding: 0;
        font-size: 0.9rem;
      }

      /* ── Title ── */
      .compact-title {
        font-size: 1.4rem;
        font-weight: 400;
        padding: 12px 16px 6px;
        color: var(--primary-text-color);
      }

      /* ── Summary row ── */
      .compact-summary {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        padding: 6px 16px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      /* ── Delivery message ── */
      .compact-message {
        padding: 4px 16px 6px;
        font-size: 0.85rem;
        color: var(--primary-text-color);
        line-height: 1.4;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      /* ── Carrier row ── */
      .compact-carriers {
        display: flex;
        flex-wrap: wrap;
        gap: 12px 20px;
        padding: 8px 16px;
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
      }

      /* ── Shared inline item (summary + carrier) ── */
      .summary-item,
      .carrier-item {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        color: var(--primary-text-color);
        white-space: nowrap;
      }

      .row-icon {
        width: 1.35rem;
        height: 1.35rem;
        border-radius: 50%;
        object-fit: cover;
        flex-shrink: 0;
      }

      /* ── USPS camera ── */
      .compact-camera {
        display: block;
        width: calc(100% - 32px);
        height: auto;
        margin: 6px 16px 0;
        border: 2px solid var(--divider-color, rgba(0, 0, 0, 0.2));
        border-radius: 4px;
        cursor: pointer;
      }

      /* ── Footer ── */
      .compact-footer {
        padding: 6px 16px 8px;
        font-size: 0.65rem;
        color: var(--disabled-text-color, var(--secondary-text-color));
        border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        margin-top: 8px;
      }
    `;
  }
}
