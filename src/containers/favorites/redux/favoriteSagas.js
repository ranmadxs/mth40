import { LOCATION_CHANGE } from 'react-router-redux';
import { put, take, cancel, takeEvery } from 'redux-saga/effects';
import mth40 from '../../../config';

import {
  FAVORITE_SAVE,
  FAVORITE_SAVE_SUCESS,
  FAVORITE_SAVE_ERROR,
} from "./actions";

export function* createFavorite({favorite}){
  try {
    console.log(favorite, 'favoriteLOLASOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
    const resp = yield fetch(
      mth40.config.API_MTH40_URL+'/favorite/save', {
        method: 'POST',
        headers: {'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(favorite),
      }
    );
    console.log(resp, 'resp');
    yield put({type: FAVORITE_SAVE_SUCESS});
  } catch (e) {
    yield put({type: FAVORITE_SAVE_ERROR, error: e.message});
  } 
}

export function* createFavoriteSaga() {
  const watcher = yield takeEvery(FAVORITE_SAVE, createFavorite);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export default [
  createFavoriteSaga(),
]; 