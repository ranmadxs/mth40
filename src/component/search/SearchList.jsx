import React from 'react'
import PropTypes from 'prop-types';

export const SearchList = ({ globalSearch, onTodoClick }) => (  
  <div>
    Search Word: {globalSearch.text}
  </div>
)
  
SearchList.propTypes = {
  globalSearch:   PropTypes.object.isRequired,
  onTodoClick:    PropTypes.func.isRequired,
}