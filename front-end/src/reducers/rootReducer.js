import { combineReducers } from 'redux';

import authorization from './authorization';
import aplication from './aplication';
import user from './user';
import order from './order';

const rootReducer = combineReducers({
  authorization,
  aplication,
  user,
  order,
});

export default rootReducer;
