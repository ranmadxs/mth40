import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { styles } from './TournamentStyle'
import { Grid } from '@material-ui/core';
import { MatchCard } from './MatchCard'

const useStyles = makeStyles((theme) => (styles(theme)));

export const TournamentMatchCards = (props) => {
    const {rosterTournament} = props;
    const classes = useStyles();
    //const bull = <span className={classes.bullet}>•</span>;
    //const nbsp = '\u00A0';
    const roster = {
        "id": "5ed4726597162a33a50909a0",
        "name": "Imperium-Inquisition{OT500-V01}Inquisitor Eisenhorn",
        "teamOwner": "Inquisitor Eisenhorn",
        "conferenceName": "Imperium",
        "mainFaction": "Inquisition"
    };
    const participant = {
        "id": 112433886,
        "name": "Inquisition [Inquisitor Eisenhorn]",
        "tournament_id": 7968393,
        "created_at": "2020-01-05T14:02:37.661-06:00",
        "seed": 1,
        "attached_participatable_portrait_url": null
    };
    const tournament = {
        "id": 7968393
    }    
    return (
        <Grid container spacing={2}>
            <MatchCard 
                roster = {roster}
                tournament = {tournament}
                participant = {participant}
            />
        </Grid>
    );
}

TournamentMatchCards.propTypes = {
    rosterTournament: PropTypes.object.isRequired,
}