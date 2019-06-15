import {
  SEARCH_FAILED,
  SEARCH_RESULT,
} from '../actions/public';

const initialState = {
  webpages: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case SEARCH_RESULT:
    return { ...state, webpages: action.data };

  case SEARCH_FAILED:
    return { ...state, webpages: null };

  default:
    return state;
  }
};
