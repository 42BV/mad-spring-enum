import { createStore, Store } from 'redux';
import { enums, setEnums, initialState, EnumsStore } from '../src/enums-reducer';

describe('Store: EnumsStore', () => {
  test('initial state', () => {
    const enumsStore = enums(undefined, {
      type: 'MAD_SPRING_ENUM.SET_ENUMS',
      enums: {},
    });

    const expected = {
      enums: {},
    };

    expect(enumsStore).toEqual(expected);
  });

  describe('actions', () => {
    let store: Store<EnumsStore>;

    beforeEach(() => {
      store = createStore(enums, initialState);
    });

    test('setEnums', () => {
      store.dispatch(setEnums({ UserRoles: ['ADMIN', 'USER'] }));

      const state = store.getState();
      expect(state.enums).toEqual({ UserRoles: ['ADMIN', 'USER'] });
    });
  });
});
