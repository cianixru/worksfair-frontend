import axios from 'axios';

import { baseURL } from '../utils/api';

const apiToken = localStorage.getItem('token');

export const NEW_WEBPAGE = 'NEW_WEBPAGE';
export const CREATE_WEBPAGE_FAILED = 'CREATE_WEBPAGE_FAILED';

/**
 * Sends new webpage data to the backend
 * @param { object } data
 * @returns { func } dispatch
 */
export const createWebpage = data => async (dispatch) => {
  try {
    const newWebpage = await axios({
      url: '/webpages/',
      method: 'post',
      data,
      baseURL,
      headers: { Authorization: `Token ${apiToken}` },
    });
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
    const webpage = await axios({
      url: `/webpages/${data}/`,
      method: 'get',
      data,
      baseURL,
      headers: { Authorization: `Token ${apiToken}` },
    });
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

export const UPDATED_WEBPAGE = 'UPDATED_WEBPAGE';
export const UPDATE_WEBPAGE_FAILED = 'UPDATE_WEBPAGE_FAILED';

/**
 * updates webpage data from the backend
 * @param { object } data
 * @returns { func } dispatch
 */
export const updateWebpage = data => async (dispatch) => {
  try {
    const webpage = await axios({
      url: `/webpages/${data.subDomainName}/`,
      method: 'patch',
      data,
      baseURL,
      headers: { Authorization: `Token ${apiToken}` },
    });
    return dispatch({
      type: UPDATED_WEBPAGE,
      data: webpage.data,
    });
  } catch (error) {
    return dispatch({
      type: UPDATE_WEBPAGE_FAILED,
      message: error.message,
      response: error.response,
    });
  }
};

export const NEW_OFFERING = 'NEW_OFFERING';
export const CREATE_OFFERING_FAILED = 'CREATE_OFFERING_FAILED';

/**
 * Sends new webpage data to the backend
 * @param { object } data
 * @returns { func } dispatch
 */
export const createWebpageOffering = data => async (dispatch) => {
  try {
    const newOffering = await axios({
      url: `/webpages/${data.subDomainName}/offerings/`,
      method: 'post',
      data,
      baseURL,
      headers: { Authorization: `Token ${apiToken}` },
    });
    return dispatch({
      type: NEW_OFFERING,
      data: newOffering.data,
    });
  } catch (error) {
    return dispatch({
      type: CREATE_OFFERING_FAILED,
      message: error.message,
      response: error.response,
    });
  }
};

export const GET_WEBPAGES = 'GET_WEBPAGES';
/**
 * Gets webpages from data
 * @param { object } data
 * @returns { func } dispatch
 */
export const getWebpages = data => (dispatch) => {
  console.log(data);
  return dispatch({
    type: GET_WEBPAGES,
    data,
  });
};
