import api from '../utils/api';

const apiToken = localStorage.getItem('token');
api.defaults.headers.common.Authorization = `Token ${apiToken}`;

export const NEW_WEBPAGE = 'NEW_WEBPAGE';
export const CREATE_WEBPAGE_FAILED = 'CREATE_WEBPAGE_FAILED';
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
