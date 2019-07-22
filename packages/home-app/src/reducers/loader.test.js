import loaderReducer from './loader';
import {
  IS_LOADING,
  IS_COMPLETE,
} from '../actions/loader';

const initialState = {
  isLoading: false,
};

describe('Loader reducer test', () => {
  test('should return the initial state', () => {
    expect(loaderReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle Loading', () => {
    expect(
      loaderReducer([], {
        type: IS_LOADING,
        data: { isLoading: true, },
      })
    ).toEqual({
      isLoading: true,
    });

    expect(
      loaderReducer([
        {
          isLoading: false,
        }
      ],
      {
        type: IS_LOADING,
        data: { isLoading: true, },
      })
    ).toEqual({
      0: {
        isLoading: false,
      },
      isLoading: true,
    });
  });
  test('should handle Loading completion', () => {
    expect(
      loaderReducer([], {
        type: IS_COMPLETE,
        data: { isLoading: false, },
      })
    ).toEqual({
      isLoading: false,
    });

    expect(
      loaderReducer([
        {
          isLoading: true,
        }
      ],
      {
        type: IS_COMPLETE,
        data: { isLoading: false, },
      })
    ).toEqual({
      0: {
        isLoading: true,
      },
      isLoading: false,
    });
  });
});
