import fetchMock from 'fetch-mock';

import { loadEnums } from '../src/load-enums';
import { configureEnums } from '../src/config';

// Mock implementation for setEnums
jest.mock('../src/enums-reducer', () => ({
  ...jest.requireActual('../src/enums-reducer'),
  setEnums: jest.fn(() => 'setEnums'),
}));

import { setEnums as mockSetEnums, EnumsStore } from '../src/enums-reducer';

describe('EnumsService', () => {
  let dispatch: jest.Mock;

  function setup({ needsAuthentication }: { needsAuthentication: boolean }): void {
    dispatch = jest.fn();
    const enumsStore = (): EnumsStore => ({ enums: {} });

    (mockSetEnums as jest.Mock).mockClear();

    configureEnums({
      enumsUrl: '/api/enums',
      needsAuthentication,
      dispatch,
      enumsStore,
    });
  }

  afterEach(() => {
    fetchMock.restore();
  });

  describe('loadEnums', () => {
    test('200 with authentication', async () => {
      setup({ needsAuthentication: true });

      fetchMock.get('/api/enums', {
        body: { fake: 'enums' },
        headers: { 'Access-Control-Allow-Credentials': 'include' },
      });

      await loadEnums();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith('setEnums');

      expect(mockSetEnums).toHaveBeenCalledTimes(1);
      expect(mockSetEnums).toHaveBeenCalledWith({ fake: 'enums' });
    });

    test('200 without authentication', async () => {
      setup({ needsAuthentication: false });

      fetchMock.get('/api/enums', { fake: 'enums' }, {});

      await loadEnums();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith('setEnums');

      expect(mockSetEnums).toHaveBeenCalledTimes(1);
      expect(mockSetEnums).toHaveBeenCalledWith({ fake: 'enums' });
    });

    test('500', async () => {
      setup({ needsAuthentication: false });

      fetchMock.get('/api/enums', 500);

      try {
        await loadEnums();
        fail();
      } catch (response) {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(mockSetEnums).toHaveBeenCalledTimes(0);
      }
    });
  });
});
