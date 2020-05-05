import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {styles} from './TournamentStyle'
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import {TournamentSelect} from './TournamentSelect';

const useStyles = makeStyles((theme) => (styles(theme)));

export const TournamentHeader = () => {
  const classes = useStyles();  
  const message = `Partidas del Torneo de Challonge`;
  const participants = [{id: 1, name: 'Partido1 (A vs B)'}, {id: 2, name: 'Partido2 (A vs C)'}];
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
                    <TournamentSelect 
                      inputLabel='Torneo'
                      formHelper='Seleccione el Torneo de Challonge'
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
                    <TournamentSelect 
                      inputLabel='Partido'
                      formHelper={message}
                      items={participants}
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