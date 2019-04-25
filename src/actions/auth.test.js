import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import api from '../utils/api';
import {
  AUTHENTICATED_USER,
  signup,
  AUTHENTICATION_FAILED,
  signin,
  GET_CURRENT_USER,
  getCurrentUser,
  GET_USER_FAILED,
} from './auth';

// eslint-disable-next-line import/prefer-default-export
export const user = {
  username: 'Theookafor2',
  first_name: 'eod',
  last_name: 'okafor',
  email: 'theodorehope@andela.com',
  facebook: null,
  instagram: null,
  twitter: null,
  headline: null,
  current_location: null,
  role: 'admin',
  confirmed_account: false,
  verified_account: false,
  reset_token: null,
  image_url: null,
  created_at: '2019-03-10T08:48:42.942532Z',
  modified_at: '2019-03-10T08:48:42.942544Z',
  token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9',
};

describe('Signup action', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const mock = new MockAdapter(api);
  const store = mockStore({
    currentUser: user,
  });

  beforeEach(() => {
    store.clearActions();
  });
  afterEach(() => {
    mock.reset();
    localStorage.clear();
  });
  afterAll(() => {
    store.clearActions();
  });

  test('should dispatch the credentials to the store after signup', () => {
    mock.onPost('/auth/register/').reply(201, user);
    const expectedActions = [{
      type: AUTHENTICATED_USER,
      data: {
        ...user,
      }
    }];
    return store.dispatch(signup(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  test('should dispatch the credentials to the store after signup', () => {
    mock.onPost('/auth/register/').reply(500, {
      type: AUTHENTICATION_FAILED,
      message: 'Cannot read property \'toLowerCase\' of undefined',
      response: { data: { user: {}, }, }
    });
    const expectedActions = [{
      type: AUTHENTICATION_FAILED,
      message: 'Cannot read property \'toLowerCase\' of undefined',
    }];
    return store.dispatch(signup({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  test('should dispatch the credentials to the store after signin', () => {
    mock.onPost('/auth/login/').reply(200, user);
    const expectedActions = [{
      type: AUTHENTICATED_USER,
      data: {
        ...user,
      }
    }];
    return store.dispatch(signin(user))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  test('should dispatch the credentials to the store after signin', () => {
    mock.onPost('/auth/login/').reply(500, {
      type: AUTHENTICATION_FAILED,
      message: 'Cannot read property \'toLowerCase\' of undefined',
      response: { data: { user: {}, }, }
    });
    const expectedActions = [{
      type: AUTHENTICATION_FAILED,
      message: 'Cannot read property \'toLowerCase\' of undefined',
    }];
    return store.dispatch(signin({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
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
      mock.onGet('/user/').reply(404, {
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
