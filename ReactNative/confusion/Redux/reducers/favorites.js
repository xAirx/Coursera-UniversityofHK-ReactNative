import * as ActionTypes from '../Api/ActionTypes';
// state is the entire redux store.
export const favorites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.ADD_FAVORITE:
      console.log('WE ARE IN THE REDUCER');
      if (state.some(el => el === action.payload)) return state;
      console.log(`THIS IS STATE CONCAT${state}`);
      return state.concat(action.payload);

    case ActionTypes.FAVORITE_DELETE:
      if (state.some(el => el === action.payload)) return state;
      return state.splice(action.payload);

    /* case ActionTypes.DONE_FAVORITE_DELETE:
      if (state.some(el => el === action.payload)) return state; */
    // REMEOVE MUTATE STATE OG FJERN HVAD DER ER I REDUX.
    /* return state.concat(action.payload); */

    default:
      return state;
  }
};
