import { combineReducers } from 'redux';

import webpage from './webpage';
import loader from './loader';

export default combineReducers({
  webpage,
  loader,
});
