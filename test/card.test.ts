import { fixture, html, expect } from '@open-wc/testing';
import { mockHass } from './mock-hass.ts';
import '../src/Home-Assistant-Mail-And-Packages-Custom-Card.ts';

type CardEl = Element & {
  hass: ReturnType<typeof mockHass>;
  setConfig: (config: Record<string, unknown>) => void;
  updateComplete: Promise<boolean>;
};

describe('mailandpackages-card', () => {
  it('renders with minimal config', async () => {
    const el = await fixture<CardEl>(html`<mailandpackages-card></mailandpackages-card>`);
    el.hass = mockHass();
    el.setConfig({ name: 'Test' });
    await el.updateComplete;
    expect(el.shadowRoot).to.exist;
    expect(el.shadowRoot!.querySelector('ha-card')).to.exist;
  });

  it('does not crash when configured camera entity is missing from hass', async () => {
    const el = await fixture<CardEl>(html`<mailandpackages-card></mailandpackages-card>`);
    el.hass = mockHass(); // empty states — no camera entity present
    el.setConfig({
      name: 'Test',
      carriers: {
        usps: { entity_camera: 'camera.mail_usps_camera' },
      },
    });
    await el.updateComplete;
    expect(el.shadowRoot).to.exist;
  });

  it('renders carrier section when an entity is configured and in hass.states', async () => {
    const el = await fixture<CardEl>(html`<mailandpackages-card></mailandpackages-card>`);
    el.hass = mockHass({
      'sensor.usps_packages': { state: '3', attributes: {} },
    });
    el.setConfig({
      name: 'Test',
      carriers: {
        usps: { entity_packages: 'sensor.usps_packages' },
      },
    });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.carrier-section')).to.exist;
  });

  it('shows the entity state value in the badge count', async () => {
    const el = await fixture<CardEl>(html`<mailandpackages-card></mailandpackages-card>`);
    el.hass = mockHass({
      'sensor.usps_packages': { state: '7', attributes: {} },
    });
    el.setConfig({
      name: 'Test',
      carriers: {
        usps: { entity_packages: 'sensor.usps_packages' },
      },
    });
    await el.updateComplete;
    const count = el.shadowRoot!.querySelector('.badge-count');
    expect(count?.textContent?.trim()).to.equal('7');
  });

  it('does not render a carrier section when no entities are in hass.states', async () => {
    const el = await fixture<CardEl>(html`<mailandpackages-card></mailandpackages-card>`);
    el.hass = mockHass(); // entity not present
    el.setConfig({
      name: 'Test',
      carriers: {
        usps: { entity_packages: 'sensor.usps_packages' },
      },
    });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.carrier-section')).to.not.exist;
  });

  it('renders the summary row when in-transit entity is configured', async () => {
    const el = await fixture<CardEl>(html`<mailandpackages-card></mailandpackages-card>`);
    el.hass = mockHass({
      'sensor.packages_in_transit': { state: '2', attributes: {} },
    });
    el.setConfig({
      name: 'Test',
      entity_packages_in_transit: 'sensor.packages_in_transit',
    });
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.summary-row')).to.exist;
  });

  it('renders the card title from config.name', async () => {
    const el = await fixture<CardEl>(html`<mailandpackages-card></mailandpackages-card>`);
    el.hass = mockHass();
    el.setConfig({ name: 'My Mailbox' });
    await el.updateComplete;
    const title = el.shadowRoot!.querySelector('.card-title');
    expect(title?.textContent?.trim()).to.equal('My Mailbox');
  });

  it('renders multiple carrier sections when multiple carriers are configured', async () => {
    const el = await fixture<CardEl>(html`<mailandpackages-card></mailandpackages-card>`);
    el.hass = mockHass({
      'sensor.usps_packages': { state: '1', attributes: {} },
      'sensor.ups_packages': { state: '2', attributes: {} },
    });
    el.setConfig({
      name: 'Test',
      carriers: {
        usps: { entity_packages: 'sensor.usps_packages' },
        ups: { entity_packages: 'sensor.ups_packages' },
      },
    });
    await el.updateComplete;
    const sections = el.shadowRoot!.querySelectorAll('.carrier-section');
    expect(sections.length).to.equal(2);
  });
});
