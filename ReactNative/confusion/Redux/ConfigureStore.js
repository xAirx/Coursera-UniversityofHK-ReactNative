/* eslint-disable no-undef */
import { createStore, combineReducers, applyMiddleware } from 'redux';
// We just learned that calling fetch from an action creator does not work
/* That’s because Redux is expecting objects as actions but we’re trying to return a Promise.
With redux-thunk we can overcome the problem and return functions from action creators.
 */
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { dishes } from './reducers/dishes';
import { comments } from './reducers/comments';
import { promotions } from './reducers/promotions';
import { leaders } from './reducers/leaders';
import { favorites } from './reducers/favorites';

const config = {
  key: 'root',
  storage,
  debug: true,
};

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const ConfigureStore = () => {
  const store = createStore(
    persistCombineReducers(config, {
      dishes,
      comments,
      promotions,
      leaders,
      favorites,
    }),
    composeEnhancer(applyMiddleware(thunk, logger))
  );

  const persistor = persistStore(store);

  return { persistor, store };
};
