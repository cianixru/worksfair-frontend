import {
  SEARCH_FAILED,
  SEARCH_RESULT,
  RETURNED_USER,
} from '../actions/public';
import { GET_USER_FAILED } from '../actions/auth';

const initialState = {
  webpages: null,
  user: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_RESULT:
    return { ...state, webpages: action.data };

  case SEARCH_FAILED:
    return { ...state, webpages: null };

  case RETURNED_USER:
    return { ...state, user: action.data };

  case GET_USER_FAILED:
    return { ...state, user: null };

  default:
    return state;
  }
};
