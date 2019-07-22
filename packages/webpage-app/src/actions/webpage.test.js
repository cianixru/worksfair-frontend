import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';

import {
  GET_WEBPAGE,
  GET_WEBPAGE_FAILED,
  getWebpage,
} from './webpage';
import api from '../utils/api';

// eslint-disable-next-line import/prefer-default-export
export const webpage = {
  title: 'Theookafor2',
  description: 'eod',
  keywords: 'okafor, sanchez, goody, love',
  sub_domain_name: 'ideosynergy',
  owner: 1,
  subDomainName: 'ideosynergy',
};

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(api);
let store = mockStore({
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

describe('Get Webpage action', () => {
  store = mockStore({
    webpage,
  });
  test('should dispatch the credentials to the store after getWebpage',
    () => {
      mock.onGet('/webpages/ideosynergy/').reply(200, webpage);
      const expectedActions = [{
        type: GET_WEBPAGE,
        data: {
          ...webpage,
        }
      }];
      return store.dispatch(getWebpage('ideosynergy'))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  test('should dispatch error to the store after get webpage fail', () => {
    mock.onGet('/webpages/dfgahjkdsf/').reply(404, {
      type: GET_WEBPAGE_FAILED,
      message: 'Request failed with status code 400',
    });
    const expectedActions = [{
      type: GET_WEBPAGE_FAILED,
      message: 'Request failed with status code 400',
    }];
    return store.dispatch(getWebpage('dfgahjkdsf'))
      .then(() => {
        expect(store.getActions().type).toEqual(expectedActions.type);
      });
  });
});
