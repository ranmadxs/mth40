import React, { useEffect } from 'react'
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { MatchCard } from './MatchCard'
import { TournamentMatchCard} from './TournamentMatchCard'

export const TournamentMatchCards = (props) => {
  const {
   // rosterTournament,
    tournamentMatch : {tmatch},
    getTournamentMatch,
    match,
    match: {
      tournament = null, 
    },
  } = props;

  useEffect(() => {        
    if (!_.isEmpty(match)) {
      getTournamentMatch(tournament.id, match.id);
    }
  // eslint-disable-next-line
  }, [match]);
  // const nbsp = '\u00A0';
  return (<>
    {!_.isEmpty(tmatch) && !_.isEmpty(match) && (
      <Grid container spacing={2} alignContent='center' alignItems='center' justify='center'>
        {!_.isEmpty(tmatch.player1) && (
          <MatchCard
            roster = {tmatch.player1.roster}
            tournament = {tmatch.tournament}
            participant = {tmatch.player1.participant}
          />
        )}
        {!_.isEmpty(tmatch.player1) && !_.isEmpty(tmatch.player2) && (
          <TournamentMatchCard
            matchName={match.name}
            conferenceName={tmatch.tournament.name}
            tournamentMatch={tmatch}
          />
        )}
        {!_.isEmpty(tmatch.player2) && (
          <MatchCard 
            roster = {tmatch.player2.roster}
            tournament = {tmatch.tournament}
            participant = {tmatch.player2.participant}
          />
        )}
      </Grid>
    )}
  </>);
}

TournamentMatchCards.propTypes = {
  getTournamentMatch: PropTypes.func.isRequired,
  rosterTournament: PropTypes.object.isRequired,
  match: PropTypes.object,
  tournamentMatch: PropTypes.object,
}