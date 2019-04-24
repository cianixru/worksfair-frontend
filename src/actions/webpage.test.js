import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import api from '../utils/api';
import {
  NEW_WEBPAGE,
  createWebpage,
  CREATE_WEBPAGE_FAILED,
} from './webpage';

// eslint-disable-next-line import/prefer-default-export
export const webpage = {
  title: 'Theookafor2',
  description: 'eod',
  keywords: 'okafor, sanchez, goody, love',
  sub_domain_name: 'theookafor2',
  owner: 1,
};

describe('Create Webpage action', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const mock = new MockAdapter(api);
  const store = mockStore({
    newWebpage: webpage,
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

  test('should dispatch the credentials to the store after createWebpage',
    () => {
      mock.onPost('/webpages/').reply(201, webpage);
      const expectedActions = [{
        type: NEW_WEBPAGE,
        data: {
          ...webpage,
        }
      }];
      return store.dispatch(createWebpage(webpage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  test('should dispatch error to the store after create webpage fail', () => {
    mock.onPost('/webpages/').reply(400, {
      type: CREATE_WEBPAGE_FAILED,
      message: 'Request failed with status code 400',
    });
    const expectedActions = [{
      type: CREATE_WEBPAGE_FAILED,
      message: 'Request failed with status code 400',
    }];
    return store.dispatch(createWebpage({}))
      .then(() => {
        expect(store.getActions().type).toEqual(expectedActions.type);
      });
  });
});
