import { connect } from 'react-redux';
import { selectedSearch } from '../../actions/search/globalSearchActions';
import { SearchList } from '../../component/search/SearchList';

const mapStateToProps = (state) => {
    console.log(state.SEARCH.SearchGlobal);
    return {
        globalSearch: {...state.SEARCH.SearchGlobal}
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
      onTodoClick: (id) => {
        dispatch(selectedSearch(id))
      }
    }
};

const SearchListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList);

export default SearchListContainer
