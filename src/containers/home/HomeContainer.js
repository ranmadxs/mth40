/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import SearchListContainer from '../search/SearchListContainer';
import PropTypes from 'prop-types';
import { TestComponent } from '../../component/test'

export const HomeContainer = (props) => { 
    const {
      version
    } = props;
    
    return (
      <div>
        <SearchListContainer/>
        <TestComponent />
        <h2>HomeContainer V {version}</h2>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/tournaments">Tournaments</a>
          </li>
          <li>
            <a href="/rosters">Rosters</a>
          </li>
          <li>
            <a href="/rosterImport">Roster Import</a>
          </li>            
        </ul>      
      </div>      
    );
};


const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

HomeContainer.propTypes = {
  version: PropTypes.string.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);