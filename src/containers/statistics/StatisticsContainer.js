import React, { Component } from "react";
import queryString from 'query-string';
import {Container} from '@material-ui/core';
import mth40 from '../../config';
//import { makeStyles } from '@material-ui/core/styles';

export default class StatisticsContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      scores: null
    };
    const {
      match: { params: {criteria} },
    } = props;  
    console.log(criteria, 'criteria');
    if (criteria) {
      let queryParams = queryString.parse(criteria);      
      console.log(queryParams, 'queryParams');
      this.loadData(queryParams);
    }    
  }

  loadData = async (queryParams) => {
    const url = mth40.config.API_MTH40_URL+ '/score/unitsByRoster/' + queryParams.rosterId;
    const response = await fetch(url);
    const jsonResp = await response.json();
    console.log(jsonResp, 'jsonResp');
    this.setState({
      scores: jsonResp
    })    
  };  

  render() {
    return (
      <Container maxWidth="lg">
        Hola Statistic desde el container
        { this.state.scores && this.state.scores.resume && this.state.scores.resume.score &&
          <div >
            La lesera de scores average :: {this.state.scores.resume.score.average}
            <div>{JSON.stringify(this.state.scores.resume.score, null, 2) }</div>
          </div>          
        }        
      </Container>
  )};  
}
/*
const StatisticsContainer = (props) => {  
  const {
    match: { params: {criteria} },
  } = props;  
  console.log(criteria, 'criteria');  

  const loadData = async (queryParams) => {
    const url = mth40.config.API_MTH40_URL+ '/score/unitsByRoster/' + queryParams.rosterId;
    const response = await fetch(url);
    const jsonResp = await response.json();
    console.log(jsonResp, 'jsonResp');
  };

  useEffect(() => {
    if (criteria) {
      let queryParams = queryString.parse(criteria);      
      console.log(queryParams, 'queryParams');
      loadData(queryParams);
    }
    // eslint-disable-next-line
  }, []);  
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
*/