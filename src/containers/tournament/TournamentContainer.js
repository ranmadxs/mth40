import React from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {TournamentFilter} from '../../component/tournaments/TournamentFilter.jsx';
import { 
    loadListTournaments as loadListTournamentsAction,
    loadListMatches as loadListMatchesAction,
} from '../../actions/tournament/challongeActions';
import {Container} from '@material-ui/core';

const TournamentContainer = (props) => {
    const {
        challonge,
        loadListTournaments,
        loadListMatches,
    } = props;
    return (
        <Container maxWidth="lg">
            <TournamentFilter
                challonge = {challonge}
                loadListTournaments = {loadListTournaments}
                loadListMatches = {loadListMatches}
            />
            <h2>Hello World Tournament</h2>
        </Container>
    );
};

TournamentContainer.propTypes = {
    challonge: PropTypes.object.isRequired,
    loadListTournaments: PropTypes.func.isRequired,
    loadListMatches: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    challonge: {...state.TOURNAMENTS.Challonge}
});

const mapDispatchToProps = (dispatch) => ({
    loadListTournaments: () => dispatch(loadListTournamentsAction()),
    loadListMatches: (tournamentId) => dispatch(loadListMatchesAction(tournamentId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TournamentContainer);