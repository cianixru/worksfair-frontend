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
