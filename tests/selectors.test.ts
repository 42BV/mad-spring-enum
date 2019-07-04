import { configureEnums } from '../src/config';
import { getEnum } from '../src/selectors';

describe('Selectors', () => {
  let enumsStore;

  beforeEach(() => {
    enumsStore = () => ({
      enums: {
        UserRole: ['ADMIN', 'USER'],
        BillingInterval: ['MONTHLY', 'WEEKLY', 'DAILY'],
      },
    });

    configureEnums({
      enumsUrl: '/api/enums',
      needsAuthentication: false,
      dispatch: jest.fn(),
      enumsStore,
    });
  });

  describe('getEnum', () => {
    it('should return the enum values when the enum is present in the store', () => {
      expect(getEnum('UserRole')).toEqual(['ADMIN', 'USER']);
      expect(getEnum('BillingInterval')).toEqual(['MONTHLY', 'WEEKLY', 'DAILY']);
    });

    it('should throw an error when the enum cannot be found in the store', () => {
      expect(() => getEnum('NonExistent')).toThrow(
        `mad-spring-enum: The enum named 'NonExistent' could not be found in the enum store, make sure the enums are loaded before the using them, and that the 'NonExistent' actually exists.`,
      );
    });
  });
});
