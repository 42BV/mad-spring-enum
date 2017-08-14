// @flow

import type { EnumsStore, Action } from './enums-reducer';

export type Config = {
  // The URL which will provide the enums over a GET request.
  enumsUrl: string,

  // Whether or not the 'enumsUrl' should be called with authentication.
  needsAuthentication: boolean,

  // The dispatch function for the Redux store.
  dispatch: (action: Action) => void,

  // A function which returns the latests EnumsStore from Redux.
  enumsStore: () => EnumsStore
};

let config: Config | null = null;

/**
 * Configures the Constraint libary.
 *
 * @param {Config} The new configuration
 */
export function configureEnums(c: Config) {
  config = c;
}

/**
 * Either returns the a Config or throws an error when the
 * config is not yet initialized.
 *
 * @returns The Config
 */
export function getConfig(): Config {
  if (config === null) {
    throw new Error('The enum service is not initialized.');
  } else {
    return config;
  }
}
