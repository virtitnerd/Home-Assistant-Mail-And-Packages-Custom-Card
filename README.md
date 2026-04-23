# Home-Assistant-Mail-And-Packages-Custom-Card

A custom Lovelace card for the [Mail and Packages integration](https://github.com/moralmunky/Home-Assistant-Mail-And-Packages) for Home Assistant.

Displays carrier package counts, delivery status badges, camera feeds, and summary totals — all configurable through the visual editor or YAML.

<img src="https://github.com/moralmunky/Home-Assistant-Mail-And-Packages-Custom-Card/blob/master/img/card-image.png?raw=true" alt="Card preview" />

## Credits

- [@moralmunky](https://github.com/moralmunky) — Original author
- [@firstof9](https://github.com/firstof9) — Major contributions and long-term maintenance
- [@virtitnerd](https://github.com/virtitnerd) — Full rewrite: Lit 3.x, 27-carrier registry, per-carrier sensor types, modern visual editor, camera conditional display
- [@brandon-claps](https://github.com/brandon-claps) — Additional carrier icons
  <br/>
  <a href="https://www.buymeacoffee.com/Moralmunky" target="_blank"><img src="/docs/coffee.png" alt="Buy Us A Coffee" height="51px" width="217px" /></a>

## Requirements

- Home Assistant **2025.5** or newer
- [Mail and Packages integration](https://github.com/moralmunky/Home-Assistant-Mail-And-Packages) installed and configured

## Installation

### HACS (Recommended)

1. Have [HACS](https://hacs.xyz) installed
2. Go to **HACS → Frontend**
3. Click the three-dot menu → **Custom repositories**
4. Add `https://github.com/moralmunky/Home-Assistant-Mail-And-Packages-Custom-Card` with type **Dashboard**
5. Search for "Mail and Packages" and install
6. Clear your browser cache

### Manual

Copy `dist/Home-Assistant-Mail-And-Packages-Custom-Card.js` and the `dist/img/` folder to `config/www/`, then add the resource:

**Settings → Dashboards → Resources → Add resource**
```
URL:  /local/Home-Assistant-Mail-And-Packages-Custom-Card.js
Type: JavaScript Module
```

## Adding the Card

Open a dashboard in edit mode, click **Add Card**, and search for **Mail and Packages**. The visual editor will open.

Alternatively, add it in YAML directly.

## YAML Configuration

```yaml
type: custom:mailandpackages-card
name: Mail and Packages          # optional card title

# ── Summary sensors (optional) ───────────────────────────────────────────────
entity_mail_updated:          sensor.mail_updated
entity_packages_in_transit:   sensor.mail_packages_in_transit
entity_packages_delivered:    sensor.mail_packages_delivered
entity_delivery_message:      sensor.mail_deliveries_message   # optional text sensor

# ── Per-carrier configuration ─────────────────────────────────────────────────
# Only carriers with at least one entity configured will render.
# All fields within each carrier are optional.
carriers:
  usps:
    entity_mail:       sensor.mail_usps_mail
    entity_packages:   sensor.mail_usps_packages
    entity_delivering: sensor.mail_usps_delivering
    entity_delivered:  sensor.mail_usps_delivered
    entity_exception:  sensor.mail_usps_exception
    entity_camera:     camera.mail_usps_camera

  ups:
    entity_packages:   sensor.mail_ups_packages
    entity_delivering: sensor.mail_ups_delivering
    entity_delivered:  sensor.mail_ups_delivered
    entity_exception:  sensor.mail_ups_exception
    entity_camera:     camera.mail_ups_camera
    camera_only_when_delivered: true   # hide camera until delivered count > 0

  fedex:
    entity_packages:   sensor.mail_fedex_packages
    entity_delivering: sensor.mail_fedex_delivering
    entity_delivered:  sensor.mail_fedex_delivered
    entity_camera:     camera.mail_fedex_camera

  amazon:
    entity_packages:   sensor.mail_amazon_packages
    entity_delivered:  sensor.mail_amazon_packages_delivered
    entity_exception:  sensor.mail_amazon_exception
    entity_hub:        sensor.mail_amazon_hub_packages
    entity_otp:        sensor.mail_amazon_otp
    entity_camera:     camera.mail_amazon_delivery_camera
    amazon_url:        https://www.amazon.com/your-orders   # optional link
    camera_only_when_delivered: true

  dhl:
    entity_packages:   sensor.mail_dhl_packages
    entity_delivering: sensor.mail_dhl_delivering
    entity_delivered:  sensor.mail_dhl_delivered

  # Add any other carrier the same way — see the carrier table below
```

### Top-level Options

| Key | Type | Description |
|-----|------|-------------|
| `name` | string | Card title shown in the header |
| `entity_mail_updated` | entity ID | Sensor whose state is the last-check timestamp |
| `entity_packages_in_transit` | entity ID | Aggregate in-transit count sensor |
| `entity_packages_delivered` | entity ID | Aggregate delivered count sensor |
| `entity_delivery_message` | entity ID | Any text sensor displayed as a delivery summary |

### Per-Carrier Options

All fields are optional. Omit any sensor you don't want displayed.

| Key | Type | Description |
|-----|------|-------------|
| `entity_mail` | entity ID | Mail piece count (USPS / Canada Post only) |
| `entity_packages` | entity ID | Packages count |
| `entity_delivering` | entity ID | Out-for-delivery count |
| `entity_delivered` | entity ID | Delivered count |
| `entity_exception` | entity ID | Exception/problem count |
| `entity_hub` | entity ID | Hub Locker count (Amazon only) |
| `entity_otp` | entity ID | OTP code sensor (Amazon only) |
| `entity_camera` | entity ID | Delivery photo camera entity |
| `camera_only_when_delivered` | boolean | Show camera only when `entity_delivered` > 0 |
| `amazon_url` | string | Custom URL for the Amazon header link |

## Supported Carriers

| Carrier | Key | Icon |
|---------|-----|------|
| USPS | `usps` | ✓ |
| UPS | `ups` | ✓ |
| FedEx | `fedex` | ✓ |
| Amazon | `amazon` | ✓ |
| Canada Post | `capost` | ✓ |
| DHL | `dhl` | ✓ |
| Hermes | `hermes` | ✓ |
| Royal Mail | `royal` | ✓ |
| Australia Post | `auspost` | ✓ |
| GLS | `gls` | ✓ |
| InPost.pl | `inpost_pl` | ✓ |
| DPD | `dpd` | ✓ |
| DPD Poland | `dpd_com_pl` | ✓ (shared DPD icon) |
| DPD Netherlands | `dpd_nl` | ✓ (shared DPD icon) |
| Evri | `evri` | fallback |
| DHL Parcel NL | `dhl_parcel_nl` | fallback |
| PostNL | `post_nl` | fallback |
| Deutsche Post | `post_de` | fallback |
| Post Austria | `post_at` | fallback |
| Poczta Polska | `poczta_polska` | ✓ |
| bol.com | `bolcom` | fallback |
| Walmart | `walmart` | fallback |
| Purolator | `purolator` | fallback |
| Intelcom | `intelcom` | fallback |
| Bonshaw | `bonshaw_distribution_network` | fallback |
| BuildingLink | `buildinglink` | fallback |
| Rewe Lieferservice | `rewe_lieferservice` | fallback |

Carriers marked "fallback" display a generic delivery icon. See [CONTRIBUTING.md](CONTRIBUTING.md) for how to contribute a branded icon.

## Delivery Message Sensor

The delivery message sensor is **not** created by the integration — it must be a [template sensor](https://www.home-assistant.io/integrations/template/) you create yourself. See the [Mail Summary Message wiki](https://github.com/moralmunky/Home-Assistant-Mail-And-Packages/wiki/Mail-Summary-Message) for examples.

## Development

```bash
npm install       # install dependencies
npm run build     # lint + build to dist/
npm start         # watch mode with dev server (port 5000)
npm test          # run test suite (Playwright/Chromium)
```

Stack: Lit 3.x · TypeScript 5.x · Rollup 4.x · Web Test Runner
