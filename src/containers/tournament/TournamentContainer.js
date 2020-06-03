import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {TournamentFilter} from '../../component/tournaments/TournamentFilter';
import {TournamentMatchCards} from '../../component/tournaments/TournamentMatchCards';
import { 
    loadListTournaments as loadListTournamentsAction,
    loadListMatches as loadListMatchesAction,
} from '../../actions/tournament/challongeActions';
import {
    getRosterTournament as getRosterTournamentAction,
} from '../../actions/roster/rosterTournamentActions';
import {Container} from '@material-ui/core';

//TODO: Agregar Datacheet como componente
//https://nadbm.github.io/react-datasheet/
//https://github.com/nadbm/react-datasheet
//TODO: Se podría abrir el excel en una nueva pantalla y la de 
//tournament valida los roser con hipervínculos y cosas
const TournamentContainer = (props) => {
    const {
        challonge,
        loadListTournaments,
        loadListMatches,
        rosterTournament,
        getRosterTournament,
    } = props;
    return (
        <Container maxWidth="lg">
            <TournamentFilter
                challonge = {challonge}
                loadListTournaments = {loadListTournaments}
                loadListMatches = {loadListMatches}
                getRosterTournament = {getRosterTournament}
            />
            <TournamentMatchCards
                rosterTournament = {rosterTournament}
            />
        </Container>
    );
};

TournamentContainer.propTypes = {
    challonge: PropTypes.object.isRequired,
    rosterTournament: PropTypes.object.isRequired,
    loadListTournaments: PropTypes.func.isRequired,
    loadListMatches: PropTypes.func.isRequired,
    getRosterTournament: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    challonge: {...state.TOURNAMENTS.Challonge},
    rosterTournament: {...state.MTH40.RosterTournament.selected},
});

const mapDispatchToProps = (dispatch) => ({
    loadListTournaments: () => dispatch(loadListTournamentsAction()),
    loadListMatches: (tournamentId) => dispatch(loadListMatchesAction(tournamentId)),
    getRosterTournament: (tournamentId, participantId) => dispatch(getRosterTournamentAction(tournamentId, participantId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentContainer);