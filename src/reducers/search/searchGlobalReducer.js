import {SEARCH_GLOBAL_REQUEST} from '../../actions/search/globalSearchActions'

const initialState = {
    text: null,
    all: [],
};

export const reducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
      case SEARCH_GLOBAL_REQUEST:
        return {
            ...state,
            text: action.text,
            all: [],
          };
      default:
        return state
    }
};