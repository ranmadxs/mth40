import React from "react";
import { connect } from 'react-redux';
import {Container} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '55ch',
    },
  },
}));

const FriendlyContainer = (props) => {

    const classes = useStyles();
    return (
        <Container maxWidth="lg">
          <form className={classes.root} noValidate autoComplete="off">
            <TextField id="outlined-basic" label="Nombre Partida" variant="outlined" size="small" fullWidth={true} />
            <Button variant="contained" color="primary">Crear</Button>
          </form>
      </Container>
    );
};

FriendlyContainer.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FriendlyContainer);