import api from '../utils/api';

const apiToken = localStorage.getItem('token');
api.defaults.headers.common.Authorization = `Token ${apiToken}`;

export const NEW_WEBPAGE = 'NEW_WEBPAGE';
export const CREATE_WEBPAGE_FAILED = 'CREATE_WEBPAGE_FAILED';

/**
 * Sends new webpage data to the backend
 * @param { object } data
 * @returns { func } dispatch
 */
export const createWebpage = data => async (dispatch) => {
  try {
    const newWebpage = await api.post('/webpages/', data);
    return dispatch({
      type: NEW_WEBPAGE,
      data: newWebpage.data,
    });
  } catch (error) {
    return dispatch({
      type: CREATE_WEBPAGE_FAILED,
      message: error.message,
      response: error.response,
    });
  }
};

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
