import { AUTHENTICATED_USER } from '../actions/auth';

const initialState = {
  currentUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATED_USER:
    return { ...state, currentUser: action.data };

  default:
    return state;
  }
};
