import { all } from 'redux-saga/effects';

import RosterSagas from './sagas/rosterSagas';
import ChallongeSagas from './sagas/tournaments/challongeSagas'

export default function* rootSaga() {
    yield all([
      ...RosterSagas,
      ...ChallongeSagas,
    ]);
}