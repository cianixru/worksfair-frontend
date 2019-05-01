import {
  NEW_WEBPAGE,
  CREATE_WEBPAGE_FAILED,
  GET_WEBPAGE,
  GET_WEBPAGE_FAILED,
} from '../actions/webpage';

const initialState = {
  newWebpage: {},
  webpage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case NEW_WEBPAGE:
    return { ...state, newWebpage: action.data };

  case CREATE_WEBPAGE_FAILED:
    return { ...state, newWebpage: null };

  case GET_WEBPAGE:
    return { ...state, webpage: action.data };

  case GET_WEBPAGE_FAILED:
    return { ...state, webpage: null };
  default:
    return state;
  }
};
