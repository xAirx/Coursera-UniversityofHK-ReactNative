import { createStore, combineReducers, applyMiddleware } from 'redux';
// We just learned that calling fetch from an action creator does not work
/* That’s because Redux is expecting objects as actions but we’re trying to return a Promise.
With redux-thunk we can overcome the problem and return functions from action creators.
 */
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { dishes } from './reducers/dishes';
import { comments } from './reducers/comments';
import { promotions } from './reducers/promotions';
import { leaders } from './reducers/leaders';

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers(
      {
        dishes,
        comments,
        promotions,
        leaders,
      },
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    ),
    applyMiddleware(thunk, logger)
  );

  return store;
};
