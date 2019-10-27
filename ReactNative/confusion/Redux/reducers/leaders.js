import * as ActionTypes from '../ActionTypes';

// This is the dishes reducer
export const leaders = (
  // Setting states needed
  state = {
    // if data is loaded from serverside
    isLoading: true,
    // if we encounter error
    errMess: null,
    // The array and details of the dishes.
    leaders: [],
  },
  // Results in a call to a method that switchs on action type passed to the reducer
  action
) => {
  switch (action.type) {
    // Setting actiontype
    // When add_dishes action is called we do the following:
    case ActionTypes.ADD_LEADERS:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        // our dishes is the action payload.
        leaders: action.payload,
      };

    case ActionTypes.LEADERS_LOADING:
      // Takes all props from state. with ...state
      return { ...state, isLoading: true, errMess: null, leaders: [] };

    case ActionTypes.LEADERS_FAILED:
      // Takes all props from state. with ...state
      return { ...state, isLoading: false, errMess: null, leaders: [] };

    default:
      return state;
  }
};
