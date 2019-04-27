import api from '../utils/api';
import auth from '../utils/auth';

const apiToken = localStorage.getItem('token');

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
  } catch (error) {
    const message = process.env.NODE_ENV === 'test'
      ? error.message : error.response.data.message;
    return dispatch({
      type: AUTHENTICATION_FAILED,
      message,
    });
  }
};

export const signin = user => async (dispatch) => {
  const { email } = user;
  try {
    user.email = email.toLowerCase();
    delete api.defaults.headers.common.Authorization;

    const returningUser = await api.post('/auth/login/', { user });
    return dispatch({
      type: AUTHENTICATED_USER,
      data: returningUser.data,
    });
  } catch (error) {
    const data = process.env.NODE_ENV === 'test'
      ? error.message : error.response.data.user;
    return dispatch({
      type: AUTHENTICATION_FAILED,
      message: error.message,
      data,
    });
  }
};

export const LOGOUT = 'LOGOUT';
export const logout = () => (dispatch) => {
  manageAuth.logout();
  return dispatch({ type: LOGOUT, data: null });
};

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const getCurrentUser = () => async (dispatch) => {
  try {
    api.defaults.headers.common.Authorization = `Token ${apiToken}`;
    const currentUser = await api.get('/auth/user/');
    return dispatch({
      type: GET_CURRENT_USER,
      data: currentUser.data,
    });
  } catch (err) {
    return dispatch({
      type: GET_USER_FAILED,
      message: err.message,
    });
  }
};
