import { connect } from 'react-redux';
//import { loadListRoster as loadListRosterAction} from '../../actions/roster/rosterActions';
import {RosterList} from '../../component/roster/RosterList'


const mapStateToProps = (state) => ({
    roster: {...state.MTH40.Roster}
});

const mapDispatchToProps = (dispatch) => ({
    //loadListRoster: () => dispatch(loadListRosterAction())
});

const RosterContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RosterList);
  
export default RosterContainer;