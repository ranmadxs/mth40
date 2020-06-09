import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects';
import mth40 from '../../config';
import {
  LOAD_TOURNAMENT_MATCH_ERROR,
  LOAD_TOURNAMENT_MATCH_SUCESS,
  LOAD_TOURNAMENT_MATCH_REQUEST,
} from "../../actions/tournament/tournamentActions";

function* getTournamentMatch({tournamentId, matchId}) {
  console.log(matchId, tournamentId);    
  try {
    const response = yield fetch(
      mth40.config.API_MTH40_URL+
      `/tournament/tmatch?tournamentId=${tournamentId}&matchId=${matchId}`
    );
    const data = yield response.json();
    yield put({type: LOAD_TOURNAMENT_MATCH_SUCESS, data: data});
  } catch (e) {
      yield put({type: LOAD_TOURNAMENT_MATCH_ERROR, error: e.message});
  }    
}

export function* getTournamentMatchSaga() {
  const watcher = yield takeEvery(LOAD_TOURNAMENT_MATCH_REQUEST, getTournamentMatch);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
  // Does not allow concurrent fetches of users
  // yield takeLatest(LOAD_USERS_LOADING, fetchUser);
}

export default [
    getTournamentMatchSaga(),
]; 