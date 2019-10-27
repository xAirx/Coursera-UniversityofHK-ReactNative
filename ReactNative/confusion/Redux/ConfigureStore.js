import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { DISHES } from '../shared/dishes';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';
import { LEADERS } from '../shared/leaders';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      DISHES,
      COMMENTS,
      PROMOTIONS,
      LEADERS,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
