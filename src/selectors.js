// @flow

import { getConfig } from './config';

import type { EnumsStore } from './enums-reducer';
import type { EnumValues } from './models';

class MissingEnumException extends Error {

}

/**
 * Finds the EnumValues by the name of the enum in the enum store.
 * 
 * If the enum cannot be found in the store an MissingEnumException
 * will be thrown.
 * 
 * 
 * @export
 * @param {string} enumName The enum you want to find the values for
 * @throws {MissingEnumException} When the enum cannot be found
 * @returns {EnumValues} 
 */
export function getEnum(enumName: string): EnumValues {
  const store: EnumsStore = getConfig().enumsStore();

  const enumValues =  store[enumName];

  if (enumValues) {
    return enumValues;
  } else {
    throw new MissingEnumException(`mad-spring-enum: The enum named '${enumName}' could not be found in the enum store, make sure the enums are loaded before the using them, and that the '${enumName}' actually exists.`);
  }
}
