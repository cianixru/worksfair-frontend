import {
  AUTHENTICATED_USER,
  LOGOUT,
  GET_CURRENT_USER,
  AUTHENTICATION_FAILED,
} from '../actions/auth';
import auth from '../utils/auth';
import alert from '../components/utils/alert';
import formatMessages from '../utils/helpers';

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
  case GET_CURRENT_USER:
    return { ...state, currentUser: action.data };
  case AUTHENTICATION_FAILED:
    alert.error(formatMessages(action.data));
    return { ...state, currentUser: {} };
  default:
    return state;
  }
};
