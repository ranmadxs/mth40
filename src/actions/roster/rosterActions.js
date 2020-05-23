export const LOAD_LIST_ROSTER_REQUEST = 'APP/ROSTER/LIST_REQUEST';
export const LOAD_LIST_ROSTER_SUCESS = 'APP/ROSTER/LIST_SUCESS';
export const LOAD_LIST_ROSTER_ERROR = 'APP/ROSTER/LIST_ERROR';

export function loadListRoster() {
//export const loadListRoster = () => dispatch =>{
    return { type: LOAD_LIST_ROSTER_REQUEST }    
    //dispatch({ type: LOAD_LIST_ROSTER_REQUEST });
 };

export function loadListRosterSuccess(data) {
    return {
      type: LOAD_LIST_ROSTER_SUCESS,
      data,
    };
}