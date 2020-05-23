import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects'
import {
    LOAD_LIST_ROSTER_REQUEST, 
    LOAD_LIST_ROSTER_SUCESS, 
    LOAD_LIST_ROSTER_ERROR, 
} from "../actions/roster/rosterActions";

async function fetchAsync() {
    const response = await fetch('http://localhost:4001/roster/list?projections=name%20teamOwner%20status%20mainFaction');
    const json = await response.json();
    return json;
}

function* listRoster() {
    try {
        const data = yield fetchAsync();
        yield put({type: LOAD_LIST_ROSTER_SUCESS, data: data});
    } catch (e) {
        yield put({type: LOAD_LIST_ROSTER_ERROR, error: e.message});
    }
 }

export function* listRosterSaga() {
    const watcher = yield takeEvery(LOAD_LIST_ROSTER_REQUEST, listRoster);
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
  
    // Does not allow concurrent fetches of users
    // yield takeLatest(LOAD_USERS_LOADING, fetchUser);
}

export default [
    listRosterSaga(),
]; 
