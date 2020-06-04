import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects';
import mth40 from '../../config';

import {
    CHALLONGE_TOURNAMENTS_LIST_REQUEST,
    CHALLONGE_TOURNAMENTS_LIST_SUCESS,
    CHALLONGE_TOURNAMENTS_LIST_ERROR,
    CHALLONGE_MATCHES_LIST_REQUEST,
    CHALLONGE_MATCHES_LIST_SUCESS,
    CHALLONGE_MATCHES_LIST_ERROR,
} from '../../actions/tournament/challongeActions';

function* listTournament() {
    try {
        const response = yield fetch(
            mth40.config.API_MTH40_URL+
            '/challonge/tournaments'
        );
        const data = yield response.json();
        yield put({type: CHALLONGE_TOURNAMENTS_LIST_SUCESS, data: data});
    } catch (e) {
        yield put({type: CHALLONGE_TOURNAMENTS_LIST_ERROR, error: e.message});
    }
}

function* listMatches({tournamentId}) {
    try {
        /*
        const response = yield fetch(
            mth40.config.API_MTH40_URL+
            `/challonge/matches?tournamentId=${tournamentId}`
        );
        */
       const response = yield fetch(
            mth40.config.API_MTH40_URL+
            `/challonge/tournament?tournamentId=${tournamentId}&include_participants=1&include_matches=1`
        );
        const data = yield response.json();
        /*
        const tournament = {
            id: tournamentId,
            matches: data,
        }        
        console.log(tournament);
        */
        yield put({type: CHALLONGE_MATCHES_LIST_SUCESS, data: data});
    } catch (e) {
        yield put({type: CHALLONGE_MATCHES_LIST_ERROR, error: e.message});
    }
}

export function* listTournamentSaga() {
    const watcher = yield takeEvery(CHALLONGE_TOURNAMENTS_LIST_REQUEST, listTournament);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export function* listMatchesSaga() {
    const watcher = yield takeEvery(CHALLONGE_MATCHES_LIST_REQUEST, listMatches);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    listTournamentSaga(),
    listMatchesSaga(),
]; 