export const FAVORITE_SAVE = 'APP/FAVORITE/SAVE';
export const FAVORITE_SAVE_SUCESS = 'APP/FAVORITE/SAVE/SUCESS';
export const FAVORITE_SAVE_ERROR = 'APP/FAVORITE/SAVE/ERROR';

export const saveFavorite = (favorite) => {
  return { type: FAVORITE_SAVE, favorite};
};
