import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadListRoster as loadListRosterAction} from '../../actions/roster/rosterActions';
import {RosterList} from '../../component/roster/RosterList';
import {RosterHeader} from '../../component/roster/RosterHeader';
import {Container} from '@material-ui/core';

export const RosterContainer = (props) => { 
    const { 
        roster,
        loadListRoster,        
    } = props;
    
    return (
        <Container maxWidth="lg">
            <RosterHeader />
            <RosterList 
                listRoster = {roster.list}
                loadListRoster = {loadListRoster}
            />
            Hola mundo soy el Roster del orto
        </Container>
    );
};


const mapStateToProps = (state) => ({
    roster: {...state.MTH40.Roster}
});

const mapDispatchToProps = (dispatch) => ({
    loadListRoster: () => dispatch(loadListRosterAction())
});

RosterContainer.propTypes = {
    roster:   PropTypes.object.isRequired,
    loadListRoster:    PropTypes.func.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(RosterContainer);