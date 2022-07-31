import { combineReducers } from 'redux';

import authorization from './authorization';
import aplication from './aplication';
import user from './user';
import order from './order';
import calculator from './calculator';

const rootReducer = combineReducers({
  authorization,
  aplication,
  user,
  order,
  calculator,
});

export default rootReducer;
