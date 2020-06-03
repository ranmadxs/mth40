import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSearch as addSearchAction} from '../../actions/search/globalSearchActions';
import {SearchAppBar} from '../../component/search/SearchAppBar'
import {Container} from '@material-ui/core';

export const SearchGlobalContainer = (props) => {
  const {
    addSearch
  } = props;
  return (
    <Container maxWidth="lg">
      <SearchAppBar
        addSearch={addSearch}
      />
    </Container>
);

}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  addSearch: (text) => dispatch(addSearchAction(text)),
});

SearchGlobalContainer.propTypes = {
  addSearch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchGlobalContainer);