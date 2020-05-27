import {MENU_SET_STATUS} from '../../actions/menu/menuActions'

const uri = window.location.pathname.length>1?window.location.pathname.replace("/", ""):window.location.pathname;

const initialState = {
    status: uri,
};

export const reducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
      case MENU_SET_STATUS:
        return {
            ...state,
            status: action.status,
          };
      default:
        return state
    }
};