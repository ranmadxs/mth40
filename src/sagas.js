import { all } from 'redux-saga/effects';

import RosterSagas from './sagas/roster/rosterSagas';
import RosterTournamentSagas from './sagas/roster/rosterTournamentSagas';
import TournamentSagas from './sagas/tournaments/tournamentSagas';
import ChallongeSagas from './sagas/tournaments/challongeSagas'

export default function* rootSaga() {
    yield all([
      ...RosterSagas,
      ...ChallongeSagas,
      ...RosterTournamentSagas,
      ...TournamentSagas,
    ]);
}