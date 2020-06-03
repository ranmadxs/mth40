import React from 'react'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { styles, muiTheme } from './TournamentStyle'
import { Card, Grid } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { ThemeProvider } from '@material-ui/core/styles';
import moment from 'moment';

const useStyles = makeStyles((theme) => (styles(theme)));

export const MatchCard = (props) => {
    const {
        roster : {name, teamOwner, conferenceName, mainFaction},
        tournament,
        participant: {seed, created_at},
    } = props;
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const nbsp = '\u00A0';
    const fechaCreacion = moment.utc(created_at).format('YYYY/MM/DD HH:mm');
    const conferenceLogo = `/images/logos/${conferenceName}.png`;
    const factionLogo = `/images/logos/${mainFaction}.png`;
    return (
        <div className={classes.root}>            
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <br/>
                    <Grid container spacing={2}>
                        <Avatar alt={conferenceName} src={conferenceLogo} className={classes.small} />
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {bull}{conferenceName}
                        </Typography>
                    </Grid>
                    <br/>
                    <Typography variant="h6" component="h2">
                        {teamOwner}
                    </Typography>
                    <br />
                    <Grid container spacing={2}>
                        <Avatar alt="Inquisition" src={factionLogo} className={classes.small} />
                        <Typography className={classes.pos} color="textSecondary">
                        {bull}{mainFaction}
                        </Typography>
                    </Grid>
                    <br/>
                    <ThemeProvider theme={muiTheme}>
                        <Typography variant="subtitle1" >
                            {seed}{bull}{name}
                            <br />
                            {fechaCreacion}
                        </Typography>
                    </ThemeProvider>
                </CardContent>
                <CardActions>
                    <Button size="small">Scores</Button>
                </CardActions>
            </Card>
        </div> 
    );
}

MatchCard.propTypes = {
    roster: PropTypes.object.isRequired,
    tournament: PropTypes.object.isRequired,
    participant: PropTypes.object.isRequired,
}