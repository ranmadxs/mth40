export const LOAD_MATCH_SCORE_REQUEST = 'APP/MATCH/SCORE_REQUEST';
export const LOAD_MATCH_SCORE_SUCESS = 'APP/MATCH/SCORE_SUCESS';
export const LOAD_MATCH_SCORE_ERROR = 'APP/MATCH/SCORE_ERROR';

export const UPDATE_UNIT_SCORE_OPTION_REQUEST = 'APP/UNIT/UPDATE_SCORE_OPTION_REQUEST';
export const UPDATE_UNIT_SCORE_OPTION_SUCESS = 'APP/UNIT/UPDATE_SCORE_OPTION_SUCESS';
export const UPDATE_UNIT_SCORE_OPTION_ERROR = 'APP/UNIT/UPDATE_SCORE_OPTION_ERROR';
export const CALCULATE_MVP = 'APP/UNIT/CALCULATE_MVP';
export const CALCULATE_MVP_SUCESS = 'APP/UNIT/CALCULATE_MVP_SUCESS';
export const CALCULATE_MVP_ERROR = 'APP/UNIT/CALCULATE_MVP_ERROR';

export const getMatchScore = (tournamentId, matchId) => {
  return { type: LOAD_MATCH_SCORE_REQUEST, tournamentId, matchId};
};

export const updateUnitScoreOption = (unitScoreOption) => {
  console.log(unitScoreOption, 'unitScoreOption');
  return { type: UPDATE_UNIT_SCORE_OPTION_REQUEST, unitScoreOption};
}

export const calculateMVP = (unitScore) => {
  console.log(unitScore, 'unitScore');
  return { type: CALCULATE_MVP, unitScore};
}