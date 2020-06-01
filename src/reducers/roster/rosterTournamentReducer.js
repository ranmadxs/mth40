import {
    LOAD_GET_ROSTER_TOURNAMENT_REQUEST, 
    LOAD_GET_ROSTER_TOURNAMENT_SUCESS, 
    LOAD_GET_ROSTER_TOURNAMENT_ERROR,
} from "../../actions/roster/rosterTournamentActions";

const initialState = {
    selected: {},
    loading: false,
    error: ''
 };

 export const reducer = (state = initialState, action) => {
    switch (action.type) {                
        case LOAD_GET_ROSTER_TOURNAMENT_REQUEST: {
            return {
                ...state,
                loading: true,
                error:''
            };
        }
        
        case LOAD_GET_ROSTER_TOURNAMENT_SUCESS: {
            return {
                ...state,
                selected: action.data,
                loading: false
            }
        }
        
        case LOAD_GET_ROSTER_TOURNAMENT_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error,
                selected: {}
            };
        }
        default: {
            return state;
        }
    }
 }
