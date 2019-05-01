import { combineReducers } from 'redux';
import auth from './auth';
import webpage from './webpage';
import loader from './loader';

export default combineReducers({
  auth,
  webpage,
  loader,
});
