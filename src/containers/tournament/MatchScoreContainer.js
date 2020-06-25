import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Container} from '@material-ui/core';
import {MatchScores} from '../../component/tournaments/score/MatchScores'
import _ from 'lodash';
import {getMatchScore as getMatchScoreAction} from '../../actions/match/matchActions';
import xlsHelper from '../../helpers/xlsHelper';


//TODO: Agregar Datacheet como componente
//https://nadbm.github.io/react-datasheet/
//https://github.com/nadbm/react-datasheet
//TODO: Se podría abrir el excel en una nueva pantalla y la de 
//tournament valida los roser con hipervínculos y cosas
const MatchScoreContainer = (props) => {
  const {
    match: { params: {tournamentId, matchId} },
    getMatchScore,
    matchScore: { data = {}},
  } = props;  

  useEffect(() => {
    console.log(tournamentId, 'tournamentId');
    console.log(matchId, 'matchId');
    getMatchScore(tournamentId, matchId);
    // eslint-disable-next-line
  }, []);

  const generateGrid = () => {
    return xlsHelper.getGridObject({data: data});
  };

  return (<>
    <Container maxWidth="lg">
      CONTAINER
      {!_.isEmpty(data) && (
        <MatchScores
          grid={generateGrid()}
        />
      )}
    </Container>
  </>);
};

MatchScoreContainer.propTypes = {
    tournamentMatch: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tournamentMatch: {...state.TOURNAMENTS.TournamentMatch},
    matchScore: {...state.TOURNAMENTS.MatchScore},
});

const mapDispatchToProps = (dispatch) => ({
  getMatchScore: (tournamentId, matchId) => dispatch(getMatchScoreAction(tournamentId, matchId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchScoreContainer);