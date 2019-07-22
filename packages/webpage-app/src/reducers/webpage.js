import {
  GET_WEBPAGE,
  GET_WEBPAGE_FAILED,
} from '../actions/webpage';

const initialState = {
  webpage: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case GET_WEBPAGE:
    return { ...state, webpage: action.data };

  case GET_WEBPAGE_FAILED:
    return { ...state, webpage: null };

  default:
    return state;
  }
};
