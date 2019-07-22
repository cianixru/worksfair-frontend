import axios from 'axios';

import { baseURL } from '../utils/api';
import auth from '../utils/auth';

const apiToken = localStorage.getItem('token');

const manageAuth = new auth();

export const AUTHENTICATED_USER = 'AUTHENTICATED_USER';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';

export const setAuthenticatedUser = payload => dispatch => {
  return dispatch(payload);
}

export const LOGOUT = 'LOGOUT';
export const logout = () => (dispatch) => {
  manageAuth.logout();
  return dispatch({ type: LOGOUT, data: {} });
};

export const GET_CURRENT_USER = 'GET_CURRENT_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';
export const getCurrentUser = () => async (dispatch) => {
  try {
    const currentUser = await axios({
      url: '/auth/user/',
      method: 'get',
      baseURL,
      headers: { Authorization: `Token ${apiToken}` },
    });
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

export const CONFIRM_USER = 'CONFIRM_USER';
export const CONFIRM_USER_FAILED = 'CONFIRM_USER_FAILED';
export const confirmAccount = ({ token }) => async (dispatch) => {
  try {
    const currentUser = await axios({
      url: '/auth/activate/',
      method: 'get',
      baseURL,
      headers: { Authorization: `Token ${token}` },
    });
    return dispatch({
      type: CONFIRM_USER,
      data: currentUser.data,
    });
  } catch (err) {
    return dispatch({
      type: CONFIRM_USER_FAILED,
      message: err.message,
    });
  }
};
