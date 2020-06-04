import React, { useEffect } from 'react'
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { MatchCard } from './MatchCard'

export const TournamentMatchCards = (props) => {
  const {
   // rosterTournament,
    tournamentMatch : {tmatch},
    getTournamentMatch,
    match,
    match: {
      tournament = null, 
      players = null,
    },
  } = props;

  useEffect(() => {        
    if (!_.isEmpty(match)) {
      getTournamentMatch(tournament.id, players.player1.id, players.player2.id);
    }
  // eslint-disable-next-line
  }, [match]);
  const nbsp = '\u00A0';
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
        <div>{nbsp}V/S{nbsp}</div>
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