import axios from 'axios';

import { baseURL } from '../utils/api';

export const SEARCH_RESULT = 'SEARCH_RESULT';
export const SEARCH_FAILED = 'SEARCH_FAILED';

/**
 * Sends a search request to the backend
 * @param { object } data
 * @returns { func } dispatch
 */
export const search = data => async (dispatch) => {
  try {
    const searchResult = await axios({
      url: `/search/?query=${data.keywords}&location=${data.location}`,
      method: 'get',
      baseURL,
    });
    return dispatch({
      type: SEARCH_RESULT,
      data: searchResult.data,
    });
  } catch (error) {
    return dispatch({
      type: SEARCH_FAILED,
      message: error.message,
      response: error.response,
    });
  }
};


export const RETURNED_USER = 'RETURNED_USER';
export const GET_USER_FAILED = 'GET_USER_FAILED';
/**
 * Sends a get user request to the backend
 * @param { object } data
 * @returns { func } dispatch
 */
export const getUser = data => async (dispatch) => {
  try {
    const userData = await axios({
      url: `/user/${data.username}/`,
      method: 'get',
      baseURL,
    });
    return dispatch({
      type: RETURNED_USER,
      data: userData.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_USER_FAILED,
      message: error.message,
      response: error.response,
    });
  }
};
