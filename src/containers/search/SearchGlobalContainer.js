import React from 'react';
import { connect } from 'react-redux';
import { addSearch } from '../../actions/search/globalSearchActions';

let SearchAll = ({ dispatch }) => {
    let input;  
    return (
      <div>
        <form onSubmit={e => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(addSearch(input.value))
          input.value = ''
        }}>
          <input ref={node => {
            input = node
          }} />
          <button type="submit">
            Search
          </button>
        </form>
      </div>
    );
  };
  SearchAll = connect()(SearchAll);
  
  export default SearchAll;
