import React from 'react'
import PropTypes from 'prop-types';
// import {Logger} from '../utils/Logger.jsx';

export const SearchInput = ({ addSearch }) => {
    let input;
    return (  
        <div>
            <form onSubmit={e => {
                e.preventDefault()
                if (!input.value.trim()) {
                    return
                }
                addSearch(input.value);
                //input.value = '';
            }}>
                <input ref={node => {
                    input = node
                }}/>
                <button type="submit">
                    Search
                </button>
            </form>
        </div>
    );
};
   
SearchInput.propTypes = {
  addSearch:    PropTypes.func.isRequired,
}