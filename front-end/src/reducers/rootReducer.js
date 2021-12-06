import { combineReducers } from 'redux';

import authorization from './authorization';

const rootReducer = combineReducers({
  authorization,
});

export default rootReducer;
