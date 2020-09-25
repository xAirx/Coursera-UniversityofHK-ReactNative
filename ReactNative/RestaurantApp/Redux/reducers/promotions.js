import * as ActionTypes from '../Api/ActionTypes';

// This is the dishes reducer
export const promotions = (
  // Setting states needed
  state = {
    // if data is loaded from serverside
    isLoading: true,
    // if we encounter error
    errMess: null,
    // The array and details of the dishes.
    promotions: [],
  },
  // Results in a call to a method that switchs on action type passed to the reducer
  action
) => {
  switch (action.type) {
    // Setting actiontype
    // When add_dishes action is called we do the following:
    case ActionTypes.DONE_PROMOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        // our dishes is the action payload.
        promotions: action.payload,
      };

    case ActionTypes.PROMOS_LOADING:
      // Takes all props from state. with ...state
      return { ...state, isLoading: true, errMess: null, promotions: [] };

    case ActionTypes.PROMOS_FAILED:
      // Takes all props from state. with ...state
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        promotions: [],
      };

    default:
      return state;
  }
};
