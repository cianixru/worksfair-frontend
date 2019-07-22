import api from '../utils/api';

export const GET_WEBPAGE = 'GET_WEBPAGE';
export const GET_WEBPAGE_FAILED = 'GET_WEBPAGE_FAILED';

/**
 * Fetches webpage data from the backend
 * @param { string } data
 * @returns { func } dispatch
 */
export const getWebpage = data => async (dispatch) => {
  try {
    const webpage = await api.get(`/webpages/${data}/`);
    return dispatch({
      type: GET_WEBPAGE,
      data: webpage.data,
    });
  } catch (error) {
    return dispatch({
      type: GET_WEBPAGE_FAILED,
      message: error.message,
      response: error.response,
    });
  }
};
