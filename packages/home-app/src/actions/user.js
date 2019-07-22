import axios from 'axios';

import { baseURL } from '../utils/api';

const apiToken = localStorage.getItem('token');

export const UPDATED_PROFILE = 'UPDATED_PROFILE';
export const UPDATE_PROFILE_FAILED = 'UPDATE_PROFILE_FAILED';
export const updateProfile = data => async (dispatch) => {
  try {
    const currentUser = await axios({
      url: `/user/${data.username}/`,
      method: 'patch',
      data,
      baseURL,
      headers: { Authorization: `Token ${apiToken}` },
    });
    return dispatch({
      type: UPDATED_PROFILE,
      data: currentUser.data,
    });
  } catch (error) {
    return dispatch({
      type: UPDATE_PROFILE_FAILED,
      message: error.message,
    });
  }
};
