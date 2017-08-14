
import { configureEnums, getConfig } from '../src/config';

test('configuration lifecycle', () => {
  // When not initialized it should throw an error.
  expect(() => getConfig()).toThrow('The enum service is not initialized.');

  // Next we initialize the config.
  const config = {
    constraintsUrl: '/api/enums',
    needsAuthentication: false,
    dispath: jest.fn,
    enumsStore: () => ({ empty: 'enums' })
  };

  configureEnums(config);

  // Now we expect the config to be set.
  expect(getConfig()).toBe(config);
});
