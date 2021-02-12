import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects';
import mth40 from '../../../config';
import {
  LOAD_MATCH_SCORE_REQUEST,
  LOAD_MATCH_SCORE_SUCESS,
  LOAD_MATCH_SCORE_ERROR,
  UPDATE_UNIT_SCORE_OPTION_REQUEST,
  UPDATE_UNIT_SCORE_OPTION_SUCESS,
  UPDATE_UNIT_SCORE_OPTION_ERROR,
  CALCULATE_MVP,
  CALCULATE_MVP_SUCESS,
  CALCULATE_MVP_ERROR,
} from "../actions/matchActions";

import {
  FAVORITE_SAVE,
} from "../../favorites/redux/actions";

function* getMatchScore({tournamentId, matchId}) {
  try {
    const response = yield fetch(
      mth40.config.API_MTH40_URL+
      `/match/score/${tournamentId}/${matchId}`
    );
    const data = yield response.json();
    const favorite = {
      name: 'Match',
      description: data.matchScore.name,
      info: data.matchScore.tournament.name,
      url: '/tournament/tmatch/'+tournamentId+'/'+matchId,    
    };
    yield put({type: FAVORITE_SAVE, favorite});
    console.log(data, 'data');
    console.log(favorite, 'favorite');
    yield put({type: LOAD_MATCH_SCORE_SUCESS, data: data});
  } catch (e) {
    yield put({type: LOAD_MATCH_SCORE_ERROR, error: e.message});
  }    
}

export function* calculateMVP({unitScore}){
  try {
    console.log(unitScore, 'unitScore');
    const resp = yield fetch(
      mth40.config.API_MTH40_URL+'/match/calculateMVP', {
        method: 'PUT',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(unitScore),
      }
    );
    const data = yield resp.json();
    console.log(data, 'data');
    yield put({type: CALCULATE_MVP_SUCESS, mvp: {value: data, row: unitScore.row}});
  } catch (e) {
    yield put({type: CALCULATE_MVP_ERROR, error: e.message});
  } 
}

export function* calculateMVPSaga(){
  const watcher = yield takeEvery(CALCULATE_MVP, calculateMVP);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* updateUnitScoreOption({unitScoreOption}){
  try {
    const resp = yield fetch(
      mth40.config.API_MTH40_URL+'/match/saveOption', {
        method: 'PUT',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(unitScoreOption),
      }
    );
    console.log(resp, 'resp');
    yield put({type: UPDATE_UNIT_SCORE_OPTION_SUCESS});
  } catch (e) {
    yield put({type: UPDATE_UNIT_SCORE_OPTION_ERROR, error: e.message});
  } 
}

export function* updateUnitScoreOptionSaga(){
  const watcher = yield takeEvery(UPDATE_UNIT_SCORE_OPTION_REQUEST, updateUnitScoreOption);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getMatchScoreSaga() {
  const watcher = yield takeEvery(LOAD_MATCH_SCORE_REQUEST, getMatchScore);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  getMatchScoreSaga(),
  calculateMVPSaga(),
  updateUnitScoreOptionSaga(),
]; 