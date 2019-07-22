import { combineReducers } from 'redux';
import auth from './auth';
import webpage from './webpage';
import loader from './loader';
import publicData from './public';

export default combineReducers({
  auth,
  webpage,
  loader,
  publicData,
});
