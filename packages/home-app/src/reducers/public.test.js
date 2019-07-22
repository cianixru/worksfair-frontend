import {
  SEARCH_RESULT,
  SEARCH_FAILED,
  RETURNED_USER,
  GET_USER_FAILED
} from '../actions/public';
import searchReducer from './public';
import { webpage } from '../actions/webpage.test';
import { user } from '../utils/test-utils/mockData';

const initialState = {
  user: null,
  webpages: null,
};

describe('Search reducer test', () => {
  test('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle Succesful search', () => {
    expect(
      searchReducer([], {
        type: SEARCH_RESULT,
        data: [webpage],
      })
    ).toEqual({
      webpages: [webpage],
    });

    expect(
      searchReducer([
        {
          webpages: [webpage],
        }
      ],
      {
        type: SEARCH_RESULT,
        data: [webpage],
      })
    ).toEqual({
      0: {
        webpages: [webpage],
      },
      webpages: [webpage],
    });
  });
  test('should handle search failure', () => {
    expect(
      searchReducer([], {
        type: SEARCH_FAILED,
        error: 'Failure',
      })
    ).toEqual({
      webpages: null,
    });

    expect(
      searchReducer([
        {
          webpages: [webpage],
        }
      ],
      {
        type: SEARCH_FAILED,
        data: null,
      })
    ).toEqual({
      0: {
        webpages: [webpage],
      },
      webpages: null,
    });
  });
});

describe('user reducer test', () => {
  test('should return the initial state', () => {
    expect(searchReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle Succesful getUser', () => {
    expect(
      searchReducer([], {
        type: RETURNED_USER,
        data: user,
      })
    ).toEqual({
      user,
    });

    expect(
      searchReducer([
        {
          user,
        }
      ],
      {
        type: RETURNED_USER,
        data: user,
      })
    ).toEqual({
      0: {
        user,
      },
      user,
    });
  });
  test('should handle search failure', () => {
    expect(
      searchReducer([], {
        type: GET_USER_FAILED,
        error: 'Failure',
      })
    ).toEqual({
      user: null,
    });

    expect(
      searchReducer([
        {
          user,
        }
      ],
      {
        type: GET_USER_FAILED,
        data: null,
      })
    ).toEqual({
      0: {
        user,
      },
      user: null,
    });
  });
});
