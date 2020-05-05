import React from 'react'
import PropTypes from 'prop-types';
import {Logger} from '../utils/Logger.jsx';

export const SearchList = ({ globalSearch, onTodoClick }) => (  
  <div>
    <Logger msg='Logueando ando desde el search' />
    <Logger msg={globalSearch} />
    Search Word: {globalSearch.text}
  </div>
)
  
SearchList.propTypes = {
  globalSearch:   PropTypes.object.isRequired,
  onTodoClick:    PropTypes.func.isRequired,
}