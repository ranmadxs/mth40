import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects';
import mth40 from '../../config';
import {
    LOAD_GET_ROSTER_TOURNAMENT_REQUEST, 
    LOAD_GET_ROSTER_TOURNAMENT_SUCESS, 
    LOAD_GET_ROSTER_TOURNAMENT_ERROR, 
} from "../../actions/roster/rosterTournamentActions";

function* getRosterTournament({tournamentId, participantId}) {
    console.log(tournamentId, participantId);
    
    try {
        const response = yield fetch(
            mth40.config.API_MTH40_URL+
            `/roster/tmatch?tournamentId=${tournamentId}&participantId=${participantId}`
        );
        const data = yield response.json();
        yield put({type: LOAD_GET_ROSTER_TOURNAMENT_SUCESS, data: data});
    } catch (e) {
        yield put({type: LOAD_GET_ROSTER_TOURNAMENT_ERROR, error: e.message});
    }
    
}


export function* getRosterTournamentSaga() {
    const watcher = yield takeEvery(LOAD_GET_ROSTER_TOURNAMENT_REQUEST, getRosterTournament);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
  
    // Does not allow concurrent fetches of users
    // yield takeLatest(LOAD_USERS_LOADING, fetchUser);
}

export default [
    getRosterTournamentSaga(),
]; 

