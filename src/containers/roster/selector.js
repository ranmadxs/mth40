import { createSelector } from 'reselect';
import _ from 'lodash';

const selectData = (state) => state.MTH40.Roster;

export {
    selectData,
};