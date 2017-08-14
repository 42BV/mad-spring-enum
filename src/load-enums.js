
import { setEnums } from './enums-reducer';

import { getConfig } from './config';

/**
 * Loads the enums from the back-end.
 *
 * The URL it will send the request to is defined by the 'enumsUrl'
 * from the Config object. The HTTP method it uses is 'get'.
 *
 * It will also send the credentials if 'needsAuthentication' from
 * the Config object is set to true.
 *
 * The entire response will be written to the Redux EnumsStore's
 * enums key. Whatever the JSON response is will be the enums.
 *
 *  An example response:
 *
 * ```JSON
 * {
 *   "UserRole": [
 *     "ADMIN",
 *     "USER"
 *  ],
 *  "BillingInterval": [
 *    "MONTHLY", "WEEKLY", "DAILY"
 *  ]
 * ```
 *
 * @returns {Promise}
 */
export function loadEnums(): Promise<*> {
  const { enumsUrl, needsAuthentication, dispatch } = getConfig();

  const config = needsAuthentication ? { credentials: 'include'} : {};

  return fetch(enumsUrl, config)
    .then(tryParse)
    .then((enums) => {
      dispatch(setEnums(enums));
    });
}

// Throw error when not 200 otherwise parse response.
function tryParse(response: Response) {
  if (response.status !== 200) {
    throw response;
  } else {
    return response.json();
  }
}
