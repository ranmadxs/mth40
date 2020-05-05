/*
 * tipos de acciones
 */

export const SEARCH_GLOBAL_REQUEST = 'APP/SEARCH_GLOBAL/REQUEST';
export const SEARCH_DETAIL_DETAIL = 'APP/SEARCH_GLOBAL/DETAIL';

/*
 * creadores de acciones
*/

export function addSearch(text) {
    return { type: SEARCH_GLOBAL_REQUEST, text }
}

export function selectedSearch(obj) {
    console.log(obj);
    return { type: SEARCH_DETAIL_DETAIL, obj }
}