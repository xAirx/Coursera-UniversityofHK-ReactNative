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
  console.log('ACTIONTYPE', action.type);

  switch (action.type) {
    // Setting actiontype

    // When add_dishes action is called we do the following:
    case ActionTypes.UPDATE_COMMENTS:
      console.log('UPDATE_COMMENTS', action.payload);
      // grab last id in state.

      return {
        // redux state
        ...state,
        errMess: null,
        isLoading: true,
        // our dishes is the action payload.
        comments: state.comments.concat({
          ...action.payload,
          // getting last id of element and adding it to the array as "ID"
          id: state.comments.slice(-1)[0].id + 1,
        }),
      };

    case ActionTypes.COMMENTS_LOADING:
      // Takes all props from state. with ...state
      return { ...state, isLoading: true, errMess: null, leaders: [] };

    case ActionTypes.COMMENTS_FAILED:
      // Takes all props from state. with ...state
      return { ...state, errMess: null, comments: [] };

    case ActionTypes.SET_COMMENTS:
      console.log('ACTION PAYLOAD SET COMMETNS:', action.payload);

      return {
        // redux state
        ...state,
        errMess: null,
        isLoading: false,
        // our dishes is the action payload.
        comments: action.payload,
      };

    default:
      return state;
  }
};
