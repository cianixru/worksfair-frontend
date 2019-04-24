import webpageReducer from './webpage';
import { NEW_WEBPAGE } from '../actions/webpage';
import { webpage } from '../actions/webpage.test';

const initialState = {
  newWebpage: {},
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
});
