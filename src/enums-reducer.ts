import { Action, Reducer } from 'redux';
import { Enums } from './models';

export const SET_ENUM = 'MAD_SPRING_ENUM.SET_ENUMS';

export interface SetEnumAction extends Action<typeof SET_ENUM> {
  enums: Enums;
}

export type EnumActions = SetEnumAction;

export interface EnumsStore {
  enums: Enums;
}

export const initialState: EnumsStore = {
  enums: {},
};

export const enums: Reducer<EnumsStore, EnumActions> = (
  state: EnumsStore = initialState,
  action: EnumActions,
): EnumsStore => {
  switch (action.type) {
    case SET_ENUM: {
      return { ...state, enums: action.enums };
    }

    default: {
      return state;
    }
  }
};

export function setEnums(enums: Enums): SetEnumAction {
  return { type: 'MAD_SPRING_ENUM.SET_ENUMS', enums };
}
