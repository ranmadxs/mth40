export const LOAD_MATCH_SCORE_REQUEST = 'APP/MATCH/SCORE_REQUEST';
export const LOAD_MATCH_SCORE_SUCESS = 'APP/MATCH/SCORE_SUCESS';
export const LOAD_MATCH_SCORE_ERROR = 'APP/MATCH/SCORE_ERROR';

export const getMatchScore = (tournamentId, matchId) => {
    return { type: LOAD_MATCH_SCORE_REQUEST, tournamentId, matchId};
};