import webpageReducer from './webpage';
import {
  NEW_WEBPAGE,
  CREATE_WEBPAGE_FAILED,
  GET_WEBPAGE_FAILED,
  GET_WEBPAGE
} from '../actions/webpage';
import { webpage } from '../actions/webpage.test';

const initialState = {
  newWebpage: {},
  webpage: null,
};

describe('Create Webpage reducer test', () => {
  test('should return the initial state', () => {
    expect(webpageReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle Create Webpage', () => {
    expect(
      webpageReducer([], {
        type: NEW_WEBPAGE,
        data: { webpage },
      })
    ).toEqual({
      newWebpage: { webpage },
    });

    expect(
      webpageReducer([
        {
          newWebpage: { webpage },
        }
      ],
      {
        type: NEW_WEBPAGE,
        data: { webpage },
      })
    ).toEqual({
      0: {
        newWebpage: { webpage },
      },
      newWebpage: { webpage },
    });
  });
  test('should handle Create Webpage failure', () => {
    expect(
      webpageReducer([], {
        type: CREATE_WEBPAGE_FAILED,
        error: 'Failure',
      })
    ).toEqual({
      newWebpage: null,
    });

    expect(
      webpageReducer([
        {
          newWebpage: { webpage },
        }
      ],
      {
        type: CREATE_WEBPAGE_FAILED,
        data: null,
      })
    ).toEqual({
      0: {
        newWebpage: { webpage },
      },
      newWebpage: null,
    });
  });

  test('should handle Get Webpage', () => {
    expect(
      webpageReducer([], {
        type: GET_WEBPAGE,
        data: { webpage },
      })
    ).toEqual({
      webpage: { webpage },
    });

    expect(
      webpageReducer([
        {
          webpage: { webpage },
        }
      ],
      {
        type: GET_WEBPAGE,
        data: { webpage },
      })
    ).toEqual({
      0: {
        webpage: { webpage },
      },
      webpage: { webpage },
    });
  });
  test('should handle Get Webpage failure', () => {
    expect(
      webpageReducer([], {
        type: GET_WEBPAGE_FAILED,
        error: 'failure',
      })
    ).toEqual({
      webpage: null,
    });

    expect(
      webpageReducer([
        {
          webpage: { webpage },
        }
      ],
      {
        type: GET_WEBPAGE_FAILED,
        error: 'failure',
      })
    ).toEqual({
      0: {
        webpage: { webpage },
      },
      webpage: null,
    });
  });
});
