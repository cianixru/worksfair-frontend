import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  isComplete,
  isLoading,
  IS_COMPLETE,
  IS_LOADING,
} from './loader';

const load = { isLoading: false };

describe('Is Loading action', () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore({
    loader: load,
  });

  beforeEach(() => {
    store.clearActions();
  });
  afterAll(() => {
    store.clearActions();
  });

  test('should dispatch the credentials to the store after isLoading',
    () => {
      const expectedActions = [{
        type: IS_LOADING,
        data: { isLoading: true },
      }];
      return store.dispatch(isLoading())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });

  test('should dispatch after loading is complete', () => {
    const expectedActions = [{
      type: IS_COMPLETE,
      data: load,
    }];
    return store.dispatch(isComplete())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
