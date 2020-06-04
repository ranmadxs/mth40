import {
    CHALLONGE_TOURNAMENTS_LIST_REQUEST, 
    CHALLONGE_TOURNAMENTS_LIST_SUCESS, 
    CHALLONGE_TOURNAMENTS_LIST_ERROR,
    CHALLONGE_MATCHES_LIST_REQUEST,
    CHALLONGE_MATCHES_LIST_SUCESS,
    CHALLONGE_MATCHES_LIST_ERROR,
    CHALLONGE_MATCH_SET_SELECTED,
} from "../../actions/tournament/challongeActions";

const initialState = {
    tournaments: [],
    tournament: {
        id: null,
        matches: [],
    },
    match: {},
    loading: false,
    loadingMatches: false,
    error: ''
 };

 export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "RESET":
        return initialState;      
      case CHALLONGE_MATCH_SET_SELECTED: {
        return {
          ...state,
          loading: false,
          match: action.match,
          error:''
        };            
      }      
        case CHALLONGE_TOURNAMENTS_LIST_REQUEST: {
            return {
                ...state,
                loading: true,
                error:''
            };
        }        
        case CHALLONGE_TOURNAMENTS_LIST_SUCESS: {
            return {
                ...state,
                tournaments: action.data,
                loading: false
            }
        }        
        case CHALLONGE_TOURNAMENTS_LIST_ERROR: {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }
        case CHALLONGE_MATCHES_LIST_REQUEST: {
            return {
                ...state,
                tournament: {
                    id: action.tournamentId
                },
                loadingMatches: true,
                match: {},
                error:''
            };
        }        
        case CHALLONGE_MATCHES_LIST_SUCESS: {
            return {
                ...state,
                tournament: action.data,
                loadingMatches: false
            }
        }        
        case CHALLONGE_MATCHES_LIST_ERROR: {
            return {
                ...state,
                loadingMatches: false,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
}