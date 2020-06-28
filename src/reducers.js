import { combineReducers } from 'redux';
//import { routerReducer as routing } from 'react-router-redux';
import {reducer as SearchGlobal} from './reducers/search/searchGlobalReducer';
import {reducer as Roster} from './reducers/roster/rosterReducer';
import {reducer as RosterTournament} from './reducers/roster/rosterTournamentReducer';
import {reducer as Menu} from './reducers/menu/menuReducer';
import {reducer as TournamentMatch} from './reducers/tournament/tournamentMatchReducer'
import {reducer as Challonge} from './reducers/tournament/challongeReducer';
import {reducer as MatchScore} from './containers/match/reducers/matchScoreReducer';
import {ADD_TODO} from './actions/generalActions'

function TODOS(state = [], action) {
    switch (action.type) {
      case ADD_TODO:
        return state.concat([action.text])
      default:
        return state
    }
};

const TOURNAMENTS = combineReducers({
  Challonge,
  TournamentMatch,
  MatchScore, 
});

const SEARCH = combineReducers({
  SearchGlobal,
  Menu,
});

const MTH40 = combineReducers({
  Roster,
  RosterTournament,
});

const reducers = combineReducers({
    SEARCH,
    MTH40,
    TODOS,
    TOURNAMENTS,
});

export default reducers;