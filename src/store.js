import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './reducers';
import rootSaga from './sagas'

//const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}, history = {}) {

    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [
        sagaMiddleware,
        thunk,
        routerMiddleware(history),
    ];    
 
    const enhancers = [
        applyMiddleware(...middlewares),
    ];
     
    const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  
    const newStore = createStore(
      rootReducer,
      initialState,
      composeEnhancers(...enhancers),
    );
  
    sagaMiddleware.run(rootSaga);
    newStore.close = () => newStore.dispatch(END);
    return newStore;
  
}