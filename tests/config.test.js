// @flow

import { configureEnums, getConfig } from '../src/config';

test('configuration lifecycle', () => {
  // When not initialized it should throw an error.
  expect(() => getConfig()).toThrow('The enum service is not initialized.');

  // Next we initialize the config.
  const config = {
    enumsUrl: '/api/enums',
    needsAuthentication: false,
    dispatch: jest.fn(),
    enumsStore: () => ({ enums: { UserRole: ['ADMIN', 'COORDINATOR'] } })
  };

  configureEnums(config);

  // Now we expect the config to be set.
  expect(getConfig()).toBe(config);
});
