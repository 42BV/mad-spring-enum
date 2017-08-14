
import { createStore } from 'redux';

import { enums, setEnums, initialState } from '../src/enums-reducer';

describe('Store: EnumsStore', () => {
  test('initial state', () => {
    const enumsStore = enums(undefined, { type: 'FAKE_ACTION' });

    const expected = {
      enums: undefined
    };

    expect(enumsStore).toEqual(expected);
  });

  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = createStore(enums, initialState);
    });

    test('setEnums', () => {
      store.dispatch(setEnums({ fake: 'enums' }));

      const state = store.getState();

      expect(state.enums).toEqual({ fake: 'enums' });
    });
  });
});
