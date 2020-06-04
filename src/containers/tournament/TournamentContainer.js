import React, { useEffect } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {TournamentFilter} from '../../component/tournaments/TournamentFilter';
import {TournamentMatchCards} from '../../component/tournaments/TournamentMatchCards';
import { 
    loadListTournaments as loadListTournamentsAction,
    loadListMatches as loadListMatchesAction,
    setChallongeSelectedMatch as setChallongeSelectedMatchAction,
} from '../../actions/tournament/challongeActions';
import {
    getTournamentMatch as getTournamentMatchAction,
} from '../../actions/tournament/tournamentActions';

import {
  reset as resetAction,
} from '../../actions/generalActions';

import {Container} from '@material-ui/core';

//TODO: Agregar Datacheet como componente
//https://nadbm.github.io/react-datasheet/
//https://github.com/nadbm/react-datasheet
//TODO: Se podría abrir el excel en una nueva pantalla y la de 
//tournament valida los roser con hipervínculos y cosas
const TournamentContainer = (props) => {
    const {
        challonge,
        challonge: { match },
        loadListTournaments,
        loadListMatches,
        rosterTournament,
        getTournamentMatch,
        reset,
        setChallongeSelectedMatch,
        tournamentMatch,
    } = props;

    useEffect(() => {        
      reset();
      // eslint-disable-next-line
    }, []);    

    return (
        <Container maxWidth="lg">
            <TournamentFilter
                challonge = {challonge}
                loadListTournaments = {loadListTournaments}
                loadListMatches = {loadListMatches}
                setChallongeSelectedMatch = {setChallongeSelectedMatch}
            />
            <br/>
            <TournamentMatchCards
                rosterTournament = {rosterTournament}
                match = {match}
                getTournamentMatch = {getTournamentMatch}
                tournamentMatch = {tournamentMatch}
            />
        </Container>
    );
};

TournamentContainer.propTypes = {
    challonge: PropTypes.object.isRequired,
    rosterTournament: PropTypes.object.isRequired,
    loadListTournaments: PropTypes.func.isRequired,
    loadListMatches: PropTypes.func.isRequired,
    getTournamentMatch: PropTypes.func.isRequired,
    setChallongeSelectedMatch: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    tournamentMatch: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    challonge: {...state.TOURNAMENTS.Challonge},
    tournamentMatch: {...state.TOURNAMENTS.TournamentMatch},
    rosterTournament: {...state.MTH40.RosterTournament.selected},
});

const mapDispatchToProps = (dispatch) => ({
    loadListTournaments: () => dispatch(loadListTournamentsAction()),
    reset: () => dispatch(resetAction()),
    loadListMatches: (tournamentId) => dispatch(loadListMatchesAction(tournamentId)),
    getTournamentMatch: (tournamentId, idPlayer1, idPlayer2) => dispatch(getTournamentMatchAction(tournamentId, idPlayer1, idPlayer2)),
    setChallongeSelectedMatch: (match) => dispatch(setChallongeSelectedMatchAction(match)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentContainer);