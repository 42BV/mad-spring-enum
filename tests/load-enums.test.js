
import fetchMock from 'fetch-mock';

import { loadEnums } from '../src/load-enums'

import { configureEnums } from '../src/config';

import * as actions from '../src/enums-reducer';

describe('EnumsService', () => {
  let dispatch;
  let enumsStore;

  function setup({ needsAuthentication }) {
    dispatch = jest.fn();
    enumsStore = () => ({ });

    // Mock the action creators
    actions.setEnums = jest.fn(() => 'setEnums');

    configureEnums({
      enumsUrl: '/api/enums',
      needsAuthentication,
      dispatch,
      enumsStore
    });
  };

  afterEach(() => {
    fetchMock.restore();
  });

  describe('loadEnums', () => {
    test('200 with authentication', async () => {
      setup({ needsAuthentication: true });

      fetchMock.get('/api/enums', { fake: 'enums' }, {
        credentials: 'include'
      });

      const data = await loadEnums();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith('setEnums');

      expect(actions.setEnums).toHaveBeenCalledTimes(1);
      expect(actions.setEnums).toHaveBeenCalledWith({ fake: 'enums' });
    });

    test('200 without authentication', async () => {
      setup({ needsAuthentication: false });

      fetchMock.get('/api/enums', { fake: 'enums' }, {});

      const data = await loadEnums();

      expect(dispatch).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledWith('setEnums');

      expect(actions.setEnums).toHaveBeenCalledTimes(1);
      expect(actions.setEnums).toHaveBeenCalledWith({ fake: 'enums' });
    });

    test('500', async () => {
      setup({ needsAuthentication: false });

      fetchMock.get('/api/enums', 500);

      try {
        const data = await loadEnums();
        fail();
      } catch(response) {
        expect(dispatch).toHaveBeenCalledTimes(0);
        expect(actions.setEnums).toHaveBeenCalledTimes(0);
      }
    });
  });
});
