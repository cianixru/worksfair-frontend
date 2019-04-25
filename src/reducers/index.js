import { combineReducers } from 'redux';
import auth from './auth';
import webpage from './webpage';

export default combineReducers({
  auth,
  webpage,
});
