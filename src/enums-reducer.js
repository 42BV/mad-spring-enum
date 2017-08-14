// @flow

import type { Enums } from './models';

export type Action = 
  | { type: 'MAD_SPRING_ENUM.SET_ENUMS', enums: Enums };

export const SET_ENUMS = 'SET_ENUMS';

export type EnumsStore = {
  +enums?: Enums,
};

export const initialState: EnumsStore = {
  enums: undefined,
};

export function enums(state: EnumsStore = initialState, action: Action): EnumsStore {
  switch(action.type) {
    case 'MAD_SPRING_ENUM.SET_ENUMS': {
      return { ...state, enums: action.enums };
    }

    default: {
      return state;
    }
  }
}

export function setEnums(enums: Enums): Action {
  return { type: 'MAD_SPRING_ENUM.SET_ENUMS', enums };
}
