import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects';
import mth40 from '../../config';
import {
  LOAD_MATCH_SCORE_REQUEST,
  LOAD_MATCH_SCORE_SUCESS,
  LOAD_MATCH_SCORE_ERROR,
} from "../../actions/match/matchActions";

function* getMatchScore({tournamentId, matchId}) {
  console.log(matchId, tournamentId);    
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

export function* getMatchScoreSaga() {
  const watcher = yield takeEvery(LOAD_MATCH_SCORE_REQUEST, getMatchScore);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  // Does not allow concurrent fetches of users
  // yield takeLatest(LOAD_USERS_LOADING, fetchUser);
}

export default [
  getMatchScoreSaga(),
]; 