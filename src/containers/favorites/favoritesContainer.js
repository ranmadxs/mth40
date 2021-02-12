import React from "react";
import { connect } from 'react-redux';
import {Container} from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';


const FavoritesContainer = (props) => {

  //const classes = useStyles();
  return (
    <Container maxWidth="lg">
      Hola Favorites desde el container    
    </Container>
  );
};

FavoritesContainer.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesContainer);