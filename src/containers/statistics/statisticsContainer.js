import React from "react";
import { connect } from 'react-redux';
import {Container} from '@material-ui/core';
//import { makeStyles } from '@material-ui/core/styles';


const StatisticsContainer = (props) => {

  //const classes = useStyles();
  return (
    <Container maxWidth="lg">
      Hola Statistic desde el container    
    </Container>
  );
};

StatisticsContainer.propTypes = {
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(StatisticsContainer);