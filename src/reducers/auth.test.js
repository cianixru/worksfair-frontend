import authReducer from './auth';
import { AUTHENTICATED_USER } from '../actions/auth';
import { user } from '../actions/auth.test';

const initialState = {
  currentUser: {},
};

describe('Sign up reducer test', () => {
  test('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  test('should handle SIGN UP', () => {
    expect(
      authReducer([], {
        type: AUTHENTICATED_USER,
        data: { user },
      })
    ).toEqual({
      currentUser: { user },
    });

    expect(
      authReducer([
        {
          currentUser: { user },
        }
      ],
      {
        type: AUTHENTICATED_USER,
        data: { user },
      })
    ).toEqual({
      0: {
        currentUser: { user },
      },
      currentUser: { user },
    });
  });
});
