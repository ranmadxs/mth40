import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Container} from '@material-ui/core';
import {MatchScores} from '../../component/tournaments/score/MatchScores'
import _ from 'lodash';
import {
  getMatchScore as getMatchScoreAction,
  updateUnitScoreOption as updateUnitScoreOptionAction,
} from './actions/matchActions';
import xlsHelper from '../../helpers/xlsHelper';

/********* Docs del datasheet  **********/
//https://nadbm.github.io/react-datasheet/
//https://github.com/nadbm/react-datasheet
//TODO: Agregar hipervínculos a los datasheet
const MatchScoreContainer = (props) => {
  const {
    match: { params: {tournamentId, matchId} },
    getMatchScore,
    updateUnitScoreOption,
    matchScore: { data = {}},    
  } = props;  

  useEffect(() => {
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
          updateUnitScoreOption={updateUnitScoreOption}
        />
      )}
    </Container>
  </>);
};

MatchScoreContainer.propTypes = {
    tournamentMatch: PropTypes.object.isRequired,
    updateUnitScoreOption: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    tournamentMatch: {...state.TOURNAMENTS.TournamentMatch},
    matchScore: {...state.TOURNAMENTS.MatchScore},
});

const mapDispatchToProps = (dispatch) => ({
  getMatchScore: (tournamentId, matchId) => dispatch(getMatchScoreAction(tournamentId, matchId)),
  updateUnitScoreOption: (unitScoreOption) => dispatch(updateUnitScoreOptionAction(unitScoreOption)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchScoreContainer);