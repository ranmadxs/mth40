import {
    LOAD_LIST_TOURNAMENTS_REQUEST, 
    LOAD_LIST_TOURNAMENTS_SUCESS, 
    LOAD_LIST_TOURNAMENTS_ERROR,
} from "../../actions/tournament/challongeActions";

const initialState = {
    list: [],
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
                list: action.data,
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
        default: {
            return state;
        }
    }
 }