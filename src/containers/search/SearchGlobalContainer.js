import { connect } from 'react-redux';
import { addSearch } from '../../actions/search/globalSearchActions';
import {SearchInput} from '../../component/search/SearchInput'

const mapStateToProps = (state) => {
  return {
      globalSearch: {...state.SEARCH.SearchGlobal}
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSearch: (text) => {
      dispatch(addSearch(text))
    }
  }
};

const SearchAll = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);

export default SearchAll;