import {
  AUTHENTICATED_USER,
  LOGOUT,
  GET_CURRENT_USER,
  AUTHENTICATION_FAILED,
} from '../actions/auth';
import auth from '../utils/auth';
import { getWebpages } from '../actions/webpage';
import { errorInterceptor } from '../utils/api';

const manageAuth = new auth();

const initialState = {
  currentUser: {},
};

export default (state = initialState, action) => {
  errorInterceptor(action);
  switch (action.type) {
    case AUTHENTICATED_USER:
      manageAuth.setLocalStorage(action.data.user);
      return { ...state, currentUser: action.data };
    case LOGOUT:
      return { ...state, currentUser: action.data };
    case GET_CURRENT_USER:
      getWebpages(action.data.user.webpages);
      return { ...state, currentUser: action.data };
    case AUTHENTICATION_FAILED:
      return { ...state, currentUser: {} };
    default:
      return state;
  }
};
