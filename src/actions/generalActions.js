/*
 * tipos de acciones
 */

export const ADD_TODO = 'ADD_TODO'
export const SEARCH_GLOBAL = 'SEARCH_GLOBAL'

/*
 * creadores de acciones
*/

export function addTodo(text) {
    return { type: ADD_TODO, text }
}

export const reset = () => {
  return { type: "RESET"};
}