import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects';
import mth40 from '../../config';
import {
    LOAD_LIST_ROSTER_REQUEST, 
    LOAD_LIST_ROSTER_SUCESS, 
    LOAD_LIST_ROSTER_ERROR, 
} from "../../actions/roster/rosterActions";

function* listRoster() {
    try {
        const response = yield fetch(
            mth40.config.API_MTH40_URL+
            '/roster/list?projections=name%20teamOwner%20status%20mainFaction%20createdAt'
        );        
        const data = yield response.json();
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
