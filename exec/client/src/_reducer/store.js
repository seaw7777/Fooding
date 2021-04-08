import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise';
import { persistStore, persistReducer } from 'redux-persist'; // imports from redux-persist
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import rootReducer from './index'; // Root reducer

const persistConfig = {
  // configuration object for redux-persist
  key: 'root',
  storage, // define which storage to use
  blacklist: ['token'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer); // create a persisted reducer

const logger = createLogger();

const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const configureStore = () => {
  let store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(thunk, logger, promiseMiddleware)),
  );

  let persistor = persistStore(store);
  return { store, persistor };
};

// used to create the persisted store, persistor will be used in the next step

export default configureStore;
