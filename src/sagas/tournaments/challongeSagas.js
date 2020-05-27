import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects';
import mth40 from '../../config';

import {
    LOAD_LIST_TOURNAMENTS_REQUEST,
    LOAD_LIST_TOURNAMENTS_SUCESS,
    LOAD_LIST_TOURNAMENTS_ERROR,
} from '../../actions/tournament/challongeActions';

function* listTournament() {
    try {
        const response = yield fetch(
            mth40.config.API_MTH40_URL+
            '/challonge/tournaments'
        );
        const data = yield response.json();
        yield put({type: LOAD_LIST_TOURNAMENTS_SUCESS, data: data});
    } catch (e) {
        yield put({type: LOAD_LIST_TOURNAMENTS_ERROR, error: e.message});
    }
 }

export function* listTournamentSaga() {
    const watcher = yield takeEvery(LOAD_LIST_TOURNAMENTS_REQUEST, listTournament);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    listTournamentSaga(),
]; 