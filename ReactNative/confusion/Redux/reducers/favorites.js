import * as ActionTypes from '../Api/ActionTypes';

export const favorites = (state = [], action) => {
  switch (action.type) {
    case ActionTypes.DONE_FAVORITE:
      if (state.some(el => el === action.payload)) return state;
      return state.concat(action.payload);

    default:
      return state;
  }
};
