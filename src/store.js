import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [thunk];
const initialState = {};
const store = createStore(
  persistedReducer,
  initialState,
  composeWithDevTools(
    applyMiddleware(...middleware)
  ),
);

const persistor = persistStore(store);

export { store, persistor };
