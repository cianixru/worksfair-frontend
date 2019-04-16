import api from '../utils/api';
import auth from '../utils/auth';

const manageAuth = new auth();

export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const signup = user => async (dispatch) => {
  const { email } = user;
  try {
    user.email = email.toLowerCase();
    user.role = 'admin';
    const newUser = await api.post('/auth/register/', user);
    return dispatch({
      type: AUTHENTICATED_USER,
      data: newUser.data,
    });
  } catch (err) {
    return dispatch({
      type: AUTHENTICATION_FAILED,
      message: err.message,
    });
  }
};

export const signin = user => async (dispatch) => {
  const { email } = user;
  try {
    user.email = email.toLowerCase();

    const returningUser = await api.post('/auth/login/', { user });
    return dispatch({
      type: AUTHENTICATED_USER,
      data: returningUser.data,
    });
  } catch (err) {
    return dispatch({
      type: AUTHENTICATION_FAILED,
      message: err.message,
    });
  }
};

export const LOGOUT = 'LOGOUT';
export const logout = () => (dispatch) => {
  manageAuth.logout();
  return dispatch({ type: LOGOUT, data: null });
};
