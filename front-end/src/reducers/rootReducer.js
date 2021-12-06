import { combineReducers } from 'redux';

import authorization from './authorization';
import aplication from './aplication';

const rootReducer = combineReducers({
  authorization,
  aplication,
});

export default rootReducer;
