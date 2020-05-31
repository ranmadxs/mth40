import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {styles} from '../utils/select/MTH40SelectStyle';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import {MTH40Select} from '../utils/select/MTH40Select';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => (styles(theme)));

export const TournamentFilter = (props) => {
  const {
    challonge,
    loadListTournaments,
    loadListMatches,
  } = props;
  const classes = useStyles();  
  const message = `Partidas del Torneo de Challonge`;

  useEffect(() => {
    loadListTournaments();
    // eslint-disable-next-line
  }, [] );

  const onChangeTournament = (tournamentId) => {
    loadListMatches(tournamentId);
  }

  const participants = challonge.tournament.matches;
  return (
    <React.Fragment>
      <CssBaseline />
        <Container fixed>
        <div className={classes.root}>
          <Typography variant="h6" gutterBottom>
            <Box component="span" color="blue" m={1}>>|</Box> Torneos Challonge
          </Typography>
          <Grid container justify="center" spacing={3}>
            <Grid key={1} item>
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar>1</Avatar>
                  </Grid>
                  <Grid item xs>
                    <MTH40Select 
                      inputLabel='Torneo'
                      formHelper='Seleccione el Torneo de Challonge'
                      items={challonge.tournaments}
                      onChange={onChangeTournament}
                      loading={challonge.loading}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            <Grid key={3} item>
              <Paper className={classes.paper}>
                <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                    <Avatar>2</Avatar>
                  </Grid>
                  <Grid item xs>
                    <MTH40Select 
                      inputLabel='Partido'
                      formHelper={message}
                      items={participants}
                      loading={challonge.loadingMatches}
                    />
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          </Grid>         
        </div>
        </Container>
    </React.Fragment>
  );
};

TournamentFilter.propTypes = {
  challonge: PropTypes.object.isRequired,
  loadListTournaments: PropTypes.func.isRequired,
  loadListMatches: PropTypes.func.isRequired,
}