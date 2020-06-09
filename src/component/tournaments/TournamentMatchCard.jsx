import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {
  //useHistory,
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export const TournamentMatchCard = (props) => {
  const classes = useStyles();
  const { matchName, tournamentMatch} = props;
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/images/banner/ImperiumBanner.png"
          title={tournamentMatch.tournament.name}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {matchName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link 
            to={`/tournament/tmatch/${tournamentMatch.tournament.id}/${tournamentMatch.id}`} 
            params={{ testvalue: "hello" }}
          >
              Scores
          </Link>
        </Button>
        <Button size="small" color="primary">
          Challonge22
        </Button>
      </CardActions>
    </Card>
  );
}
TournamentMatchCard.propTypes = {
  matchName: PropTypes.string.isRequired,  
  tournamentMatch: PropTypes.object.isRequired,
}