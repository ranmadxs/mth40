import {
    LOAD_LIST_ROSTER_REQUEST, 
    LOAD_LIST_ROSTER_SUCESS, 
    LOAD_LIST_ROSTER_ERROR
} from "../../actions/roster/rosterActions";
 
const initialState = {
    list: [],
    loading: false,
    error: ''
 };

 export const reducer = (state = initialState, action) => {
    switch (action.type) {                
        case LOAD_LIST_ROSTER_REQUEST: {
            return {
                ...state,
                loading: true,
                error:''
            };
        }
        
        case LOAD_LIST_ROSTER_SUCESS: {
            return {
                ...state,
                list: action.data,
                loading: false
            }
        }
        
        case LOAD_LIST_ROSTER_ERROR: {
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