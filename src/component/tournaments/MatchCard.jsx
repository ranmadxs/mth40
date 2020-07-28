import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { styles, muiTheme } from './TournamentStyle'
import { Card, Grid } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { ThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => (styles(theme)));

export const MatchCard = (props) => {
    const {
        roster : {name, teamOwner, conferenceName, mainFaction},
        // tournament,
        participant: {seed, created_at},
    } = props;

    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    // const nbsp = '\u00A0';
    const fechaCreacion = moment.utc(created_at).format('YYYY/MM/DD HH:mm');
    const conferenceImageName = conferenceName.replace(/ /g, '_');
    const conferenceLogo = `/images/logos/${conferenceImageName}.png`;
    const factionImageName = mainFaction.replace(/ /g, '_');    
    const factionLogo = `/images/logos/${factionImageName}.png`;
    console.log(conferenceLogo, 'conferenceLogo');
    return (
        <div className={classes.root}>            
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <br/>
                    <Grid container spacing={2} alignItems="center">
                        <Avatar alt={conferenceName} src={conferenceLogo} className={classes.medium} />
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {bull}{conferenceName}
                        </Typography>
                    </Grid>
                    <br/>
                    <Typography variant="h6" component="h2">
                        {teamOwner}
                    </Typography>
                    <br />
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={2}>
                        <Avatar alt={mainFaction} src={factionLogo} className={classes.medium} />
                      </Grid>
                      <Grid item xs={10}>
                        <Typography className={classes.pos} color="textSecondary">                      
                          {bull}{mainFaction}
                        </Typography>
                      </Grid>
                    </Grid>
                    <br/>
                    <ThemeProvider theme={muiTheme}>
                        <Typography variant="subtitle1" >
                            {seed}{bull}{name}
                            <br /><br />
                            Fecha Creación: {fechaCreacion}
                        </Typography>
                    </ThemeProvider>
                </CardContent>
            </Card>
        </div> 
    );
}

MatchCard.propTypes = {
    roster: PropTypes.object.isRequired,
    tournament: PropTypes.object.isRequired,
    participant: PropTypes.object.isRequired,
}