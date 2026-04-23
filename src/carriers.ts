/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CarrierEntityConfig } from './types';

export interface CarrierSensorType {
  /** Identifier: 'mail' | 'packages' | 'delivering' | 'delivered' | 'exception' | 'hub' | 'otp' */
  key: string;
  /** Key in CarrierEntityConfig that holds this sensor's entity ID */
  configKey: keyof CarrierEntityConfig;
  /** Label shown below the badge */
  label: string;
}

export interface CarrierDefinition {
  /** Key used in the card config carriers object and in image filenames */
  key: string;
  /** Human-readable display name */
  name: string;
  /** Path relative to HACS files base: img/square_[key].png */
  image: string;
  /** Exception-specific image, falls back to image if undefined */
  exceptionImage?: string;
  /** Hub-specific image, falls back to image if undefined */
  hubImage?: string;
  /** Carrier website for linking the header name */
  url?: string;
  /** Which sensor types this carrier exposes (order determines badge order) */
  sensors: CarrierSensorType[];
  /** True if this carrier has a delivery photo camera entity */
  hasCamera?: boolean;
}

// ── Reusable sensor type definitions ──────────────────────────────────────────

const SENSOR_MAIL: CarrierSensorType = {
  key: 'mail',
  configKey: 'entity_mail',
  label: 'Mail',
};

const SENSOR_PACKAGES: CarrierSensorType = {
  key: 'packages',
  configKey: 'entity_packages',
  label: 'Packages',
};

const SENSOR_DELIVERING: CarrierSensorType = {
  key: 'delivering',
  configKey: 'entity_delivering',
  label: 'Out for Delivery',
};

const SENSOR_DELIVERED: CarrierSensorType = {
  key: 'delivered',
  configKey: 'entity_delivered',
  label: 'Delivered',
};

const SENSOR_EXCEPTION: CarrierSensorType = {
  key: 'exception',
  configKey: 'entity_exception',
  label: 'Exception',
};

const SENSOR_HUB: CarrierSensorType = {
  key: 'hub',
  configKey: 'entity_hub',
  label: 'Hub Locker',
};

const SENSOR_OTP: CarrierSensorType = {
  key: 'otp',
  configKey: 'entity_otp',
  label: 'OTP Code',
};

// ── Carrier registry (order determines display order in the card) ─────────────

export const CARRIERS: CarrierDefinition[] = [
  {
    key: 'usps',
    name: 'USPS',
    image: 'img/square_usps.png',
    exceptionImage: 'img/square_usps_exception.png',
    url: 'https://informeddelivery.usps.com/',
    sensors: [SENSOR_MAIL, SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED, SENSOR_EXCEPTION],
    hasCamera: true,
  },
  {
    key: 'ups',
    name: 'UPS',
    image: 'img/square_ups.png',
    exceptionImage: 'img/square_ups_exception.png',
    url: 'https://wwwapps.ups.com/mcdp',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED, SENSOR_EXCEPTION],
    hasCamera: true,
  },
  {
    key: 'fedex',
    name: 'FedEx',
    image: 'img/square_fedex.png',
    url: 'https://www.fedex.com/en-us/tracking.html',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
    hasCamera: true,
  },
  {
    key: 'amazon',
    name: 'Amazon',
    image: 'img/square_amazon.png',
    exceptionImage: 'img/square_amazon_exception.png',
    hubImage: 'img/square_amazon-hub.png',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERED, SENSOR_EXCEPTION, SENSOR_HUB, SENSOR_OTP],
    hasCamera: true,
  },
  {
    key: 'capost',
    name: 'Canada Post',
    image: 'img/square_canada-post.png',
    url: 'https://www.canadapost-postescanada.ca',
    sensors: [SENSOR_MAIL, SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'dhl',
    name: 'DHL',
    image: 'img/square_dhl.png',
    url: 'https://www.dhl.com',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'hermes',
    name: 'Hermes',
    image: 'img/square_hermes-packages.png',
    url: 'https://www.myhermes.co.uk',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'royal',
    name: 'Royal Mail',
    image: 'img/square_royal-mail.png',
    url: 'https://www.royalmail.com',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'auspost',
    name: 'Australia Post',
    image: 'img/square_australia-post.png',
    url: 'https://auspost.com.au',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'evri',
    name: 'Evri',
    image: 'img/square_evri.png',
    url: 'https://www.evri.com',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'gls',
    name: 'GLS',
    image: 'img/square_gls.png',
    url: 'https://gls-group.eu',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'dhl_parcel_nl',
    name: 'DHL Parcel NL',
    image: 'img/square_dhl_parcel_nl.png',
    url: 'https://www.dhlparcel.nl',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'inpost_pl',
    name: 'InPost.pl',
    image: 'img/square_inpost.png',
    url: 'https://inpost.pl',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'dpd_com_pl',
    name: 'DPD Poland',
    image: 'img/square_dpd.png',
    url: 'https://tracktrace.dpd.com.pl',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'dpd',
    name: 'DPD',
    image: 'img/square_dpd.png',
    url: 'https://www.dpd.com',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'dpd_nl',
    name: 'DPD Netherlands',
    image: 'img/square_dpd.png',
    url: 'https://www.dpd.nl',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'post_nl',
    name: 'PostNL',
    image: 'img/square_post_nl.png',
    exceptionImage: 'img/square_post_nl_exception.png',
    url: 'https://www.postnl.nl',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED, SENSOR_EXCEPTION],
  },
  {
    key: 'post_de',
    name: 'Deutsche Post',
    image: 'img/square_post_de.png',
    url: 'https://www.deutschepost.de',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING],
  },
  {
    key: 'post_at',
    name: 'Post Austria',
    image: 'img/square_post_at.png',
    url: 'https://www.post.at',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'bolcom',
    name: 'bol.com',
    image: 'img/square_bolcom.png',
    url: 'https://www.bol.com',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'walmart',
    name: 'Walmart',
    image: 'img/square_walmart.png',
    exceptionImage: 'img/square_walmart_exception.png',
    url: 'https://www.walmart.com',
    sensors: [SENSOR_DELIVERING, SENSOR_DELIVERED, SENSOR_EXCEPTION],
    hasCamera: true,
  },
  {
    key: 'purolator',
    name: 'Purolator',
    image: 'img/square_purolator.png',
    url: 'https://www.purolator.com',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'intelcom',
    name: 'Intelcom',
    image: 'img/square_intelcom.png',
    url: 'https://www.intelcom.ca',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'bonshaw_distribution_network',
    name: 'Bonshaw',
    image: 'img/square_bonshaw_distribution_network.png',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
  {
    key: 'poczta_polska',
    name: 'Poczta Polska',
    image: 'img/square_poczta-polska.png',
    url: 'http://emonitoring.poczta-polska.pl',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING],
  },
  {
    key: 'buildinglink',
    name: 'BuildingLink',
    image: 'img/square_buildinglink.png',
    sensors: [SENSOR_DELIVERED],
  },
  {
    key: 'rewe_lieferservice',
    name: 'Rewe Lieferservice',
    image: 'img/square_rewe_lieferservice.png',
    url: 'https://www.rewe.de/service/lieferservice',
    sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  },
];

/**
 * Returns the image path for a given sensor type within a carrier,
 * applying exception/hub overrides where available.
 */
export function getCarrierSensorImage(carrier: CarrierDefinition, sensorKey: string): string {
  if (sensorKey === 'exception' && carrier.exceptionImage) {
    return carrier.exceptionImage;
  }
  if (sensorKey === 'hub' && carrier.hubImage) {
    return carrier.hubImage;
  }
  return carrier.image;
}
