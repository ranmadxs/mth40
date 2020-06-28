import {
  LOAD_MATCH_SCORE_REQUEST,
  LOAD_MATCH_SCORE_SUCESS,
  LOAD_MATCH_SCORE_ERROR,
} from "../actions/matchActions";

const initialState = {
  score: {},
  data: {},
  loading: false,
  error: '',
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "RESET":
      return initialState;
    case LOAD_MATCH_SCORE_REQUEST: {
      return {
        ...state,
        loading: true,
        error:''
      };
    }        
    case LOAD_MATCH_SCORE_SUCESS: {
      return {
        ...state,
        data: action.data,
        loading: false
      }
    }        
    case LOAD_MATCH_SCORE_ERROR: {
      return {
        ...state,
        loading: false,
        score: {},
        data: {},
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}