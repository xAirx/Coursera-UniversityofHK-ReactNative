/* While it is certainly possible to manually create action objects everywhere, and write each type value by hand,
defining reusable constants makes maintaining code easier. */

/* Actions are plain JavaScript objects that must have a type,
and reducers determine what to do based on specified action.
Let’s define constants to hold the different actions.
 */
export const DISHES_LOADING = 'DISHES_LOADING';
export const DONE_DISHES = 'DONE_DISHES';
export const DISHES_FAILED = 'DISHES_FAILED';
export const DONE_COMMENTS = 'DONE_COMMENTS';
export const COMMENTS_FAILED = 'COMMENTS_FAILED';
export const COMMENTS_LOADING = 'COMMENTS_LOADING';
export const PROMOS_LOADING = 'PROMOS_LOADING';
export const DONE_PROMOS = 'DONE_PROMOS';
export const PROMOS_FAILED = 'PROMOS_FAILED';
export const LEADERS_LOADING = 'LEADERS_LOADING';
export const DONE_LEADERS = 'DONE_LEADERS';
export const LEADERS_FAILED = 'LEADERS_FAILED';

export const LEADERS_DONE = 'LEADERS_DONE';
export const DISHES_DONE = 'LEADERS_DONE';
export const PROMOTIONS_DONE = 'LEADERS_DONE';
export const POST_FAVORITE = 'POST_FAVORITE';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const FAVORITE_DELETE = 'FAVORITE_DELETE';
export const UPDATE_COMMENTS = 'UPDATE_COMMENTS';
export const ADD_COMMENTS = 'ADD_COMMENTS';
export const DELETE_FAVORITE = 'DELETE_FAVORITE';
