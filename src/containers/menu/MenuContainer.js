import { connect } from 'react-redux';
import { loadListRoster as loadListRosterAction} from '../../actions/roster/rosterActions';
import {MainHeader} from '../../component/header/MainHeader'

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
    loadListRoster: () => dispatch(loadListRosterAction())
});

const MenuContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(MainHeader);
  
export default MenuContainer;