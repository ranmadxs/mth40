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
} from "../actions/matchActions";

function* getMatchScore({tournamentId, matchId}) {
  try {
    const response = yield fetch(
      mth40.config.API_MTH40_URL+
      `/match/score/${tournamentId}/${matchId}`
    );
    const data = yield response.json();
    
    yield put({type: LOAD_MATCH_SCORE_SUCESS, data: data});
  } catch (e) {
    yield put({type: LOAD_MATCH_SCORE_ERROR, error: e.message});
  }    
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
  updateUnitScoreOptionSaga(),
]; 