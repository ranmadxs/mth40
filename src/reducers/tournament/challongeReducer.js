import {
    LOAD_LIST_TOURNAMENTS_REQUEST, 
    LOAD_LIST_TOURNAMENTS_SUCESS, 
    LOAD_LIST_TOURNAMENTS_ERROR,
    LOAD_LIST_MATCHES_REQUEST,
    LOAD_LIST_MATCHES_SUCESS,
    LOAD_LIST_MATCHES_ERROR,
} from "../../actions/tournament/challongeActions";

const initialState = {
    tournaments: [],
    tournament: {
        id: null,
        matches: [],
    },
    loading: false,
    error: ''
 };

 export const reducer = (state = initialState, action) => {
    switch (action.type) {                
        case LOAD_LIST_TOURNAMENTS_REQUEST: {
            return {
                ...state,
                loading: true,
                error:''
            };
        }        
        case LOAD_LIST_TOURNAMENTS_SUCESS: {
            return {
                ...state,
                tournaments: action.data,
                loading: false
            }
        }        
        case LOAD_LIST_TOURNAMENTS_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case LOAD_LIST_MATCHES_REQUEST: {
            return {
                ...state,
                tournament: {
                    id: action.tournamentId
                },
                loading: true,
                error:''
            };
        }        
        case LOAD_LIST_MATCHES_SUCESS: {
            return {
                ...state,
                tournament: action.data,
                loading: false
            }
        }        
        case LOAD_LIST_MATCHES_ERROR: {
            return {
                ...state,
                loading: false,                
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
 }