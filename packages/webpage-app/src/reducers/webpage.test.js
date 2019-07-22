import webpageReducer from './webpage';
import {
  GET_WEBPAGE_FAILED,
  GET_WEBPAGE,
} from '../actions/webpage';
import { webpage } from '../actions/webpage.test';

const initialState = {
  webpage: null,
};

describe('Create Webpage reducer test', () => {
  test('should return the initial state', () => {
    expect(webpageReducer(undefined, {})).toEqual(initialState);
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
