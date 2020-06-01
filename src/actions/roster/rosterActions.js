export const LOAD_LIST_ROSTER_REQUEST = 'APP/ROSTER/LIST_REQUEST';
export const LOAD_LIST_ROSTER_SUCESS = 'APP/ROSTER/LIST_SUCESS';
export const LOAD_LIST_ROSTER_ERROR = 'APP/ROSTER/LIST_ERROR';

export const loadListRoster = () => {
    return { type: LOAD_LIST_ROSTER_REQUEST }    
};