import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import { createStore } from 'redux';
import configureStore from './store';
import { Provider } from 'react-redux';
//import rootReducer from './reducers';

require('dotenv').config();

console.log("LOLASOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", 1);
console.log(process.env.PORT, 'process.env.PORT');
console.log(process.env.DB_HOST, 'process.env.DB_HOST');
console.log(process.env);

const store = configureStore({});

// export PORT=5000
// npm run dev
/*
const store = createStore(
  rootReducer, 
  {}, 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
*/
store.dispatch({
  type: 'ADD_TODO',
  text: 'Init App MTH'
});

console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
