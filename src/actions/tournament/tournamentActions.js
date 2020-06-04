export const LOAD_TOURNAMENT_MATCH_REQUEST = 'APP/TOURNAMENT/MATCH_REQUEST';
export const LOAD_TOURNAMENT_MATCH_SUCESS = 'APP/TOURNAMENT/MATCH_SUCESS';
export const LOAD_TOURNAMENT_MATCH_ERROR = 'APP/TOURNAMENT/MATCH_ERROR';

export const getTournamentMatch = (tournamentId, idPlayer1, idPlayer2) => {
    return { type: LOAD_TOURNAMENT_MATCH_REQUEST, tournamentId, idPlayer1, idPlayer2};
};