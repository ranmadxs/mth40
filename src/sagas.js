import { all } from 'redux-saga/effects';

import RosterSagas from './sagas/rosterSagas';

export default function* rootSaga() {
    yield all([
      ...RosterSagas,
    ]);
}