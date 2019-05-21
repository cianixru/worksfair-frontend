import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

import {
  NEW_WEBPAGE,
  createWebpage,
  CREATE_WEBPAGE_FAILED,
  GET_WEBPAGE,
  GET_WEBPAGE_FAILED,
  getWebpage,
  UPDATED_WEBPAGE,
  UPDATE_WEBPAGE_FAILED,
  updateWebpage,
  CREATE_OFFERING_FAILED,
  NEW_OFFERING,
  createWebpageOffering,
} from './webpage';

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
const mock = new MockAdapter(axios);
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

describe('Create Webpage action', () => {
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
describe('Update Webpage action', () => {
  test('should dispatch the credentials to the store after updateWebpage',
    () => {
      mock.onPatch('/webpages/ideosynergy/').replyOnce(200, webpage);
      const expectedActions = [{
        type: UPDATED_WEBPAGE,
        data: {
          ...webpage,
        }
      }];
      return store.dispatch(updateWebpage(webpage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  test('should dispatch error to the store after update webpage fail', () => {
    mock.onPatch('/webpages/ideosynergy/').reply(400, {
      type: UPDATE_WEBPAGE_FAILED,
      message: 'Request failed with status code 400',
    });
    const expectedActions = [{
      type: UPDATE_WEBPAGE_FAILED,
      message: 'Request failed with status code 400',
    }];
    return store.dispatch(updateWebpage({}))
      .then(() => {
        expect(store.getActions().type).toEqual(expectedActions.type);
      });
  });
});

describe('Create Offering action', () => {
  test('should dispatch the credentials to the store after createOffering',
    () => {
      mock.onPost('/webpages/ideosynergy/offerings/').reply(201, webpage);
      const expectedActions = [{
        type: NEW_OFFERING,
        data: {
          ...webpage,
        }
      }];
      return store.dispatch(createWebpageOffering(webpage))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  test('should dispatch error to the store after create webpage fail', () => {
    mock.onPost('/webpages/ideosynergy/offerings/').reply(400, {
      type: CREATE_OFFERING_FAILED,
      message: 'Request failed with status code 400',
    });
    const expectedActions = [{
      type: CREATE_OFFERING_FAILED,
      message: 'Request failed with status code 400',
    }];
    return store.dispatch(createWebpageOffering({}))
      .then(() => {
        expect(store.getActions().type).toEqual(expectedActions.type);
      });
  });
});
