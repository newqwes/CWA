import createSagaMiddleware from 'redux-saga';
import { applyMiddleware, compose, createStore } from 'redux';

import rootSaga from '../sagas/rootSaga';
import rootReducer from '../reducers/rootReducer';
import socketMiddleware from './socketMiddleware';

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store =
  createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, socketMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;
