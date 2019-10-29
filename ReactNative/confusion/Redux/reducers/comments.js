import * as ActionTypes from '../Api/ActionTypes';

// This is the dishes reducer
export const comments = (
  // Setting states needed
  state = {
    // if we encounter error
    errMess: null,
    // The array and details of the dishes.
    comments: [],
  },
  // Results in a call to a method that switchs on action type passed to the reducer
  action
) => {
  switch (action.type) {
    // Setting actiontype
    // When add_dishes action is called we do the following:
    case ActionTypes.COMMENTS_DONE:
      return {
        ...state,
        errMess: null,
        isLoading: false,
        // our dishes is the action payload.
        comments: action.payload,
      };

    case ActionTypes.COMMENTS_LOADING:
      // Takes all props from state. with ...state
      return { ...state, isLoading: true, errMess: null, leaders: [] };

    case ActionTypes.COMMENTS_FAILED:
      // Takes all props from state. with ...state
      return { ...state, errMess: null, comments: [] };

    default:
      return state;
  }
};
