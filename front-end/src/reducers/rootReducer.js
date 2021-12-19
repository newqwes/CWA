import { combineReducers } from 'redux';

import authorization from './authorization';
import aplication from './aplication';
import user from './user';

const rootReducer = combineReducers({
  authorization,
  aplication,
  user,
});

export default rootReducer;
