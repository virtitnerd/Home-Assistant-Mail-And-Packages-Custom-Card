# Contributing

Thanks for wanting to improve the Mail and Packages Custom Card!

## Adding a New Carrier

Before opening a PR to add a carrier to this card, confirm all three of the following:

### 1. The shipper is supported by the main integration

The card only displays sensors that the [Mail and Packages integration](https://github.com/moralmunky/Home-Assistant-Mail-And-Packages) creates. If the integration doesn't support your carrier yet, start there first. A PR to the card for an unsupported carrier will be closed.

Check the integration's [supported shippers list](https://github.com/moralmunky/Home-Assistant-Mail-And-Packages#supported-shippers) to confirm.

### 2. Provide a carrier icon

Every carrier **must** ship with a branded icon. PRs without an icon will not be merged.

**Spec:**

| Requirement | Value |
|-------------|-------|
| Filename | `src/img/square_[carrier-key].png` |
| Format | PNG |
| Dimensions | 200 × 200 px minimum (square) |
| Style | Carrier logo or wordmark on a solid brand-color background |
| Shape | Square image — CSS renders it circular with `border-radius: 50%` |

Look at the existing files in `src/img/` for reference.

If the carrier has a visually distinct exception state (e.g. USPS/UPS), you may also include `src/img/square_[carrier-key]_exception.png`.

### 3. Know whether the carrier supports a delivery camera

Some carriers expose a delivery photo camera entity (e.g. `camera.mail_ups_camera`). Set `hasCamera: true` in the registry entry if the integration creates one for your carrier. Leave it out if it doesn't.

---

## Making the Change

### Edit `src/carriers.ts`

Add an entry to the `CARRIERS` array. Copy the shape from an existing carrier and fill in your values:

```typescript
{
  key: 'mycarrier',          // lowercase, matches integration's sensor prefix
  name: 'My Carrier',        // display name
  image: 'img/square_mycarrier.png',
  url: 'https://www.mycarrier.com/tracking',
  sensors: [SENSOR_PACKAGES, SENSOR_DELIVERING, SENSOR_DELIVERED],
  // hasCamera: true,        // uncomment if the integration creates a camera entity
},
```

**Available sensor types** (use only the ones the integration actually creates for this carrier):

| Constant | Config key | Label |
|----------|------------|-------|
| `SENSOR_MAIL` | `entity_mail` | Mail |
| `SENSOR_PACKAGES` | `entity_packages` | Packages |
| `SENSOR_DELIVERING` | `entity_delivering` | Out for Delivery |
| `SENSOR_DELIVERED` | `entity_delivered` | Delivered |
| `SENSOR_EXCEPTION` | `entity_exception` | Exception |
| `SENSOR_HUB` | `entity_hub` | Hub Locker |
| `SENSOR_OTP` | `entity_otp` | OTP Code |

### Build and verify

```bash
npm install
npm run build
```

Confirm the new carrier section appears on a card configured with that carrier's entities and that the icon renders correctly.

---

## Other Contributions

- **Bug fixes** — Open an issue first if the fix is non-trivial, so we can agree on the approach.
- **UI/UX improvements** — Describe the change and attach a screenshot in the PR description.
- **New languages** — Add a JSON file under `src/localize/languages/` following the structure of `en.json`, then import it in `src/localize/localize.ts`.
- **Test improvements** — The test suite uses Web Test Runner + Playwright. See `test/card.test.ts` for examples.

## Code Style

- Run `npm run lint` before pushing — the pre-commit hook enforces ESLint + Prettier on staged `.ts` files.
- No new comments explaining *what* the code does — only *why* when it's non-obvious.
- Keep PRs focused: one concern per PR.
