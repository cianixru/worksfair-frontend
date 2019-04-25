import { AUTHENTICATED_USER, LOGOUT } from '../actions/auth';
import auth from '../utils/auth';

const manageAuth = new auth();

const initialState = {
  currentUser: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  case AUTHENTICATED_USER:
    manageAuth.setLocalStorage(action.data.user);
    return { ...state, currentUser: action.data };
  case LOGOUT:
    return { ...state, currentUser: action.data };
  default:
    return state;
  }
};
