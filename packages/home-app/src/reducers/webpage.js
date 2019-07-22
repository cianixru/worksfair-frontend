import {
  NEW_WEBPAGE,
  CREATE_WEBPAGE_FAILED,
  GET_WEBPAGE,
  GET_WEBPAGE_FAILED,
  UPDATED_WEBPAGE,
  UPDATE_WEBPAGE_FAILED,
  NEW_OFFERING,
  CREATE_OFFERING_FAILED,
  UPDATED_OFFERING,
  UPDATE_OFFERING_FAILED,
} from '../actions/webpage';

const initialState = {
  newWebpage: {},
  webpage: null,
  offering: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case NEW_WEBPAGE:
    return { ...state, newWebpage: action.data };

  case CREATE_WEBPAGE_FAILED:
    return { ...state, newWebpage: null };

  case GET_WEBPAGE || UPDATED_WEBPAGE:
    return { ...state, webpage: action.data };

  case GET_WEBPAGE_FAILED || UPDATE_WEBPAGE_FAILED:
    return { ...state, webpage: null };

  case NEW_OFFERING:
    return { ...state, offering: action.data };

  case CREATE_OFFERING_FAILED:
    return { ...state, offering: null };

  case UPDATE_OFFERING_FAILED:
    return { ...state, offering: null };

  case UPDATED_OFFERING:
    return { ...state, offering: action.data };

  default:
    return state;
  }
};
