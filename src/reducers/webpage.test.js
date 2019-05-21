import webpageReducer from './webpage';
import {
  NEW_WEBPAGE,
  CREATE_WEBPAGE_FAILED,
  GET_WEBPAGE_FAILED,
  GET_WEBPAGE,
  CREATE_OFFERING_FAILED,
  NEW_OFFERING,
} from '../actions/webpage';
import { webpage } from '../actions/webpage.test';

const initialState = {
  newWebpage: {},
  webpage: null,
  offering: null,
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

  test('should handle Create Offering', () => {
    expect(
      webpageReducer([], {
        type: NEW_OFFERING,
        data: { webpage },
      })
    ).toEqual({
      offering: { webpage },
    });

    expect(
      webpageReducer([
        {
          offering: { webpage },
        }
      ],
      {
        type: NEW_OFFERING,
        data: { webpage },
      })
    ).toEqual({
      0: {
        offering: { webpage },
      },
      offering: { webpage },
    });
  });
  test('should handle Create offering failure', () => {
    expect(
      webpageReducer([], {
        type: CREATE_OFFERING_FAILED,
        error: 'Failure',
      })
    ).toEqual({
      offering: null,
    });

    expect(
      webpageReducer([
        {
          offering: { webpage },
        }
      ],
      {
        type: CREATE_OFFERING_FAILED,
        data: null,
      })
    ).toEqual({
      0: {
        offering: { webpage },
      },
      offering: null,
    });
  });
});
