import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {Container} from '@material-ui/core';

//TODO: Agregar Datacheet como componente
//https://nadbm.github.io/react-datasheet/
//https://github.com/nadbm/react-datasheet
//TODO: Se podría abrir el excel en una nueva pantalla y la de 
//tournament valida los roser con hipervínculos y cosas
const MatchScoreContainer = (props) => {
    const {
        match: { params: {tournamentId, matchId} },
    } = props;

    useEffect(() => {        
      console.log(tournamentId, 'tournamentId');
      console.log(matchId, 'matchId');
      // eslint-disable-next-line
    }, []);    

    return (
        <Container maxWidth="lg">
            XD Aca va a aparecer el excel del terror.
        </Container>
    );
};

MatchScoreContainer.propTypes = {
    tournamentMatch: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    tournamentMatch: {...state.TOURNAMENTS.TournamentMatch},
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchScoreContainer);