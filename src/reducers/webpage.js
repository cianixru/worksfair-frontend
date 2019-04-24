import { NEW_WEBPAGE, CREATE_WEBPAGE_FAILED } from '../actions/webpage';

const initialState = {
  newWebpage: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case NEW_WEBPAGE:
    return { ...state, newWebpage: action.data };

  case CREATE_WEBPAGE_FAILED:
    // action.
    return null;
  default:
    return state;
  }
};
