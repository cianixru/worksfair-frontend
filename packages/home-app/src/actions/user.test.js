import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import {
  updateProfile,
  UPDATE_PROFILE_FAILED,
  UPDATED_PROFILE,
} from './user';
import { user } from '../utils/test-utils/mockData';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);
const store = mockStore({
  auth: { currentUser: user },
  webpage: { newWebpage: {} },
});

beforeEach(() => {
  store.clearActions();
});
afterEach(() => {
  mock.reset();
});
afterAll(() => {
  store.clearActions();
});


describe('Update User action', () => {
  const data = {
    username: 'mirage',
  };

  test('should dispatch the results to the store after updating profile',
    () => {
      mock.onPatch(`/user/${data.username}/`)
        .reply(200, user);
      const expectedActions = [{
        type: UPDATED_PROFILE,
        data: user
      }];
      return store.dispatch(updateProfile(data))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  test('should dispatch error to the store after updating user fail', () => {
    mock.onPatch('/user/TheoOkafor').reply(404, {
      type: UPDATE_PROFILE_FAILED,
      message: 'Request failed with status code 404',
    });
    const expectedActions = [{
      type: UPDATE_PROFILE_FAILED,
      message: 'Request failed with status code 404',
    }];
    return store.dispatch(updateProfile({}))
      .then(() => {
        expect(store.getActions().type).toEqual(expectedActions.type);
      });
  });
});
