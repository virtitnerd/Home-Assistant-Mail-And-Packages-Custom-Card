/* eslint-disable @typescript-eslint/no-explicit-any */
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type { CSSResultGroup, TemplateResult } from 'lit';
import { HomeAssistant, fireEvent, LovelaceCardEditor } from 'custom-card-helpers';

import type { MailAndPackagesCardConfig, CarrierEntityConfig } from './types';
import { CARD_VERSION } from './const';
import { CARRIERS, CarrierDefinition, CarrierSensorType } from './carriers';
import { localize } from './localize/localize';

@customElement('mailandpackages-card-editor')
export class MailandpackagesCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: MailAndPackagesCardConfig;
  @state() private _openSections: Set<string> = new Set(['general']);

  public setConfig(config: MailAndPackagesCardConfig): void {
    this._config = config;
  }

  // ── Top-level entity helpers ──────────────────────────────────────────────

  private _setTopLevel(key: string, value: string): void {
    if (!this._config) return;
    const updated = { ...this._config };
    if (value) {
      (updated as any)[key] = value;
    } else {
      delete (updated as any)[key];
    }
    this._config = updated;
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _setCarrierEntity(carrierKey: string, configKey: keyof CarrierEntityConfig, value: string): void {
    if (!this._config) return;
    const carriers = { ...(this._config.carriers || {}) };
    const carrierCfg: CarrierEntityConfig = { ...(carriers[carrierKey] || {}) };
    if (value) {
      (carrierCfg as any)[configKey] = value;
    } else {
      delete (carrierCfg as any)[configKey];
    }
    if (Object.keys(carrierCfg).length === 0) {
      delete carriers[carrierKey];
    } else {
      carriers[carrierKey] = carrierCfg;
    }
    this._config = { ...this._config, carriers };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _setCarrierBoolean(carrierKey: string, configKey: keyof CarrierEntityConfig, value: boolean): void {
    if (!this._config) return;
    const carriers = { ...(this._config.carriers || {}) };
    const carrierCfg: CarrierEntityConfig = { ...(carriers[carrierKey] || {}) };
    if (value) {
      (carrierCfg as any)[configKey] = true;
    } else {
      delete (carrierCfg as any)[configKey];
    }
    carriers[carrierKey] = carrierCfg;
    this._config = { ...this._config, carriers };
    fireEvent(this, 'config-changed', { config: this._config });
  }

  // ── Section accordion ─────────────────────────────────────────────────────

  private _toggleSection(key: string): void {
    const next = new Set(this._openSections);
    if (next.has(key)) {
      next.delete(key);
    } else {
      next.add(key);
    }
    this._openSections = next;
  }

  private _renderSection(key: string, label: string, content: TemplateResult): TemplateResult {
    const open = this._openSections.has(key);
    return html`
      <div class="section">
        <div class="section-header" @click=${() => this._toggleSection(key)}>
          <span class="section-title">${label}</span>
          <ha-icon icon=${open ? 'mdi:chevron-up' : 'mdi:chevron-down'}></ha-icon>
        </div>
        ${open ? html`<div class="section-body">${content}</div>` : ''}
      </div>
    `;
  }

  // ── Entity selector helpers ───────────────────────────────────────────────

  private _entityPicker(
    label: string,
    value: string | undefined,
    domains: string[],
    onChange: (v: string) => void,
  ): TemplateResult {
    return html`
      <ha-selector
        .hass=${this.hass}
        .selector=${{ entity: { domain: domains[0] } }}
        .value=${value ?? ''}
        .label=${label}
        @value-changed=${(e: CustomEvent<{ value: string | null }>) => onChange(e.detail.value ?? '')}
      ></ha-selector>
    `;
  }

  private _textField(label: string, value: string | undefined, onChange: (v: string) => void): TemplateResult {
    return html`
      <ha-textfield
        .label=${label}
        .value=${value || ''}
        @change=${(e: Event) => onChange((e.target as HTMLInputElement).value)}
      ></ha-textfield>
    `;
  }

  // ── Render carrier section body ───────────────────────────────────────────

  private _renderCarrierBody(carrier: CarrierDefinition): TemplateResult {
    const cfg = this._config?.carriers?.[carrier.key] || {};

    const sensorPickers = carrier.sensors.map((s: CarrierSensorType) =>
      this._entityPicker(s.label, (cfg as any)[s.configKey], ['sensor'], (v) =>
        this._setCarrierEntity(carrier.key, s.configKey, v),
      ),
    );

    const cameraPicker = carrier.hasCamera
      ? this._entityPicker('Camera', cfg.entity_camera, ['camera'], (v) =>
          this._setCarrierEntity(carrier.key, 'entity_camera', v),
        )
      : html``;

    const hasDeliveredSensor = carrier.sensors.some((s) => s.configKey === 'entity_delivered');
    const cameraConditional =
      carrier.hasCamera && cfg.entity_camera && hasDeliveredSensor && carrier.key !== 'usps'
        ? html`
            <ha-formfield label="Only show camera when delivered count > 0">
              <ha-switch
                .checked=${cfg.camera_only_when_delivered ?? false}
                @change=${(e: Event) =>
                  this._setCarrierBoolean(
                    carrier.key,
                    'camera_only_when_delivered',
                    (e.target as HTMLInputElement).checked,
                  )}
              ></ha-switch>
            </ha-formfield>
          `
        : html``;

    const amazonUrl =
      carrier.key === 'amazon'
        ? this._textField('Amazon URL (optional)', cfg.amazon_url, (v) =>
            this._setCarrierEntity(carrier.key, 'amazon_url', v),
          )
        : html``;

    return html` ${sensorPickers} ${cameraPicker} ${cameraConditional} ${amazonUrl} `;
  }

  // ── Main render ───────────────────────────────────────────────────────────

  protected render(): TemplateResult | void {
    if (!this.hass || !this._config) return html``;

    const cfg = this._config;

    return html`
      <div class="card-config">
        <p class="version-info">${localize('common.name')} v${CARD_VERSION}</p>

        ${this._renderSection(
          'general',
          'General',
          html`
            ${this._textField('Card Name', cfg.name, (v) => this._setTopLevel('name', v))}
            ${this._entityPicker(
              'Mail Updated Entity (sensor.mail_updated)',
              cfg.entity_mail_updated,
              ['sensor'],
              (v) => this._setTopLevel('entity_mail_updated', v),
            )}
          `,
        )}
        ${this._renderSection(
          'summary',
          'Summary Sensors',
          html`
            ${this._entityPicker('Packages In Transit', cfg.entity_packages_in_transit, ['sensor'], (v) =>
              this._setTopLevel('entity_packages_in_transit', v),
            )}
            ${this._entityPicker('Packages Delivered', cfg.entity_packages_delivered, ['sensor'], (v) =>
              this._setTopLevel('entity_packages_delivered', v),
            )}
            ${this._entityPicker(
              'Delivery Message (optional text sensor)',
              cfg.entity_delivery_message,
              ['sensor'],
              (v) => this._setTopLevel('entity_delivery_message', v),
            )}
          `,
        )}

        <div class="section-group-label">Carriers</div>

        ${CARRIERS.map((carrier) =>
          this._renderSection(`carrier_${carrier.key}`, carrier.name, this._renderCarrierBody(carrier)),
        )}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .card-config {
        padding: 4px 0;
      }

      .version-info {
        font-size: 0.75rem;
        color: var(--secondary-text-color);
        margin: 0 0 12px;
        padding: 0 4px;
      }

      .section {
        border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
        border-radius: 4px;
        margin-bottom: 8px;
        overflow: hidden;
      }

      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 12px;
        cursor: pointer;
        background: var(--secondary-background-color);
        user-select: none;
      }

      .section-header:hover {
        background: var(--table-row-background-color, var(--secondary-background-color));
      }

      .section-title {
        font-size: 0.9rem;
        font-weight: 500;
      }

      .section-body {
        display: grid;
        grid-template-columns: 1fr;
        gap: 8px;
        padding: 12px;
        background: var(--card-background-color);
      }

      .section-group-label {
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--secondary-text-color);
        padding: 8px 4px 4px;
      }

      ha-entity-picker,
      ha-textfield {
        display: block;
        width: 100%;
      }

      ha-formfield {
        display: flex;
        align-items: center;
        padding: 4px 0;
      }
    `;
  }
}
