import { combineReducers } from 'redux';
//import { routerReducer as routing } from 'react-router-redux';
import {reducer as SearchGlobal} from './reducers/search/searchGlobalReducer';
import {ADD_TODO} from './actions/generalActions'

function TODOS(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return state.concat([action.text])
      default:
        return state
    }
};

const SEARCH = combineReducers({
  SearchGlobal,
});

const reducers = combineReducers({
//    routing,
    SEARCH,
    TODOS,
});

export default reducers;