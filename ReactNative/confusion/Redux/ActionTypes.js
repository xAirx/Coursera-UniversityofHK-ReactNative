/* While it is certainly possible to manually create action objects everywhere, and write each type value by hand,
defining reusable constants makes maintaining code easier. */

/* Actions are plain JavaScript objects that must have a type,
and reducers determine what to do based on specified action.
Let’s define constants to hold the different actions.
 */
export const DISHES_LOADING = 'DISHES_LOADING';
export const ADD_DISHES = 'ADD_DISHES';
export const DISHES_FAILED = 'DISHES_FAILED';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
export const PROMOS_LOADING = 'PROMOS_LOADING';
export const ADD_PROMOS = 'ADD_PROMOS';
export const PROMOS_FAILED = 'PROMOS_FAILED';
export const LEADERS_LOADING = 'LEADERS_LOADING';
export const ADD_LEADERS = 'ADD_LEADERS';
export const LEADERS_FAILED = 'LEADERS_FAILED';