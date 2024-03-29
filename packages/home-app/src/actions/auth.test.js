import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import axios from 'axios';

import api from '../utils/api';
import {
  AUTHENTICATED_USER,
  signup,
  AUTHENTICATION_FAILED,
  setAuthenticatedUser,
  GET_CURRENT_USER,
  getCurrentUser,
  GET_USER_FAILED,
} from './auth';
import { user } from '../utils/test-utils/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  currentUser: user,
});

beforeEach(() => {
  store.clearActions();
});
afterAll(() => {
  store.clearActions();
});

describe('setAuthenticatedUser action', () => {
  const mock = new MockAdapter(api);
  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test('should dispatch the credentials to the store after setAuthenticatedUser', () => {
    const payload = {
      type: AUTHENTICATED_USER,
      data: {
        ...user,
      }
    }
    const expectedActions = payload;
    expect(store.dispatch(setAuthenticatedUser(payload))).toEqual(expectedActions);
  });
  test('should dispatch the credentials to the store after setAuthenticatedUser', () => {
    const payload = {
      type: AUTHENTICATION_FAILED,
      message: 'Cannot read property \'toLowerCase\' of undefined',
    };
    const expectedActions = payload;
    expect(store.dispatch(setAuthenticatedUser(payload))).toEqual(expectedActions);
 
  });
});

describe('Get User action', () => {
  const mock = new MockAdapter(axios);
  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });

  test('should dispatch the credentials to the store after fetching user',
    () => {
      localStorage.setItem('token', 'WYSISYG');
      mock.onGet('/auth/user/').reply(200, user);
      const expectedActions = [{
        type: GET_CURRENT_USER,
        data: {
          ...user,
        }
      }];
      return store.dispatch(getCurrentUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  test('should dispatch the credentials to the store after fetching user',
    () => {
      mock.onGet('/auth/user/').reply(404, {
        type: GET_USER_FAILED,
        message: 'Request failed with status code 404',
      });
      const expectedActions = [{
        type: GET_USER_FAILED,
        message: 'Request failed with status code 404',
      }];
      return store.dispatch(getCurrentUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
