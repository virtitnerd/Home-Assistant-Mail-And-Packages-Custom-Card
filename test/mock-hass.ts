export interface MockEntityState {
  state: string;
  attributes: Record<string, unknown>;
}

export function mockHass(states: Record<string, MockEntityState> = {}) {
  return {
    states,
    localize: (key: string) => key,
    language: 'en',
    config: { unit_system: { length: 'mi' } },
    themes: {},
    selectedTheme: null,
    panels: {},
    services: {},
    user: { is_admin: false },
    connected: true,
  };
}
