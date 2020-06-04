import {
    LOAD_TOURNAMENT_MATCH_ERROR,
    LOAD_TOURNAMENT_MATCH_SUCESS,
    LOAD_TOURNAMENT_MATCH_REQUEST,
} from "../../actions/tournament/tournamentActions";

const initialState = {
    tmatch: null,
    loading: false,
    error: ''
 };

 export const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "RESET":
        return initialState;
      case LOAD_TOURNAMENT_MATCH_REQUEST: {
        return {
          ...state,
          loading: true,                
          error:''
        };
      }        
        case LOAD_TOURNAMENT_MATCH_SUCESS: {
            return {
                ...state,
                tmatch: action.data,
                loading: false
            }
        }        
        case LOAD_TOURNAMENT_MATCH_ERROR: {
            return {
                ...state,
                loading: false,
                tmatch: null,
                error: action.error
            };
        }
        default: {
            return state;
        }
    }
 }