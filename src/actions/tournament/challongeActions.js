export const LOAD_LIST_TOURNAMENTS_REQUEST = 'APP/TOURNAMENTS/LIST_REQUEST';
export const LOAD_LIST_TOURNAMENTS_SUCESS = 'APP/TOURNAMENTS/LIST_SUCESS';
export const LOAD_LIST_TOURNAMENTS_ERROR = 'APP/TOURNAMENTS/LIST_ERROR';

export const loadListTournaments = () => {
    return { type: LOAD_LIST_TOURNAMENTS_REQUEST }
};
