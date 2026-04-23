import { LovelaceCardConfig } from 'custom-card-helpers';

declare global {
  interface HTMLElementTagNameMap {
    'mailandpackages-card-editor': HTMLElement;
    'hui-error-card': HTMLElement;
  }
}

/** Per-carrier entity configuration. All fields are optional; only configured sensors render. */
export interface CarrierEntityConfig {
  /** e.g. sensor.mail_usps_mail */
  entity_mail?: string;
  /** e.g. sensor.mail_usps_packages */
  entity_packages?: string;
  /** e.g. sensor.mail_usps_delivering */
  entity_delivering?: string;
  /** e.g. sensor.mail_usps_delivered (note: component key is usps_delivered) */
  entity_delivered?: string;
  /** e.g. sensor.mail_usps_exception */
  entity_exception?: string;
  /** Amazon Hub only: sensor.mail_amazon_hub_packages */
  entity_hub?: string;
  /** Amazon OTP only: sensor.mail_amazon_otp */
  entity_otp?: string;
  /** camera.mail_usps_camera / camera.mail_amazon_delivery_camera etc. */
  entity_camera?: string;
  /** Amazon-specific: URL to open when the Amazon header is clicked */
  amazon_url?: string;
}

export interface MailAndPackagesCardConfig extends LovelaceCardConfig {
  type: string;
  /** Card title shown in the header */
  name?: string;

  /** sensor.mail_updated — shown as "Last Check" timestamp in the footer */
  entity_mail_updated?: string;
  /** sensor.mail_packages_in_transit — aggregate in-transit total */
  entity_packages_in_transit?: string;
  /** sensor.mail_packages_delivered — aggregate delivered total */
  entity_packages_delivered?: string;
  /** Any text sensor whose state is shown as a delivery summary message */
  entity_delivery_message?: string;

  /**
   * Per-carrier configuration keyed by the carrier's key string
   * (e.g. 'usps', 'ups', 'amazon', 'capost', …).
   * Carriers with no entry are not rendered.
   */
  carriers?: Record<string, CarrierEntityConfig>;

  show_warning?: boolean;
  test_gui?: boolean;
}
