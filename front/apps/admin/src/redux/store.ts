import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
import storage from 'redux-persist/lib/storage';

import { persistReducer } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(
  persistConfig,
  persistReducer(persistConfig, reducers)
);

declare global {
  interface Window {
    MyNamespace: any;
  }
}

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

const enhancers = [applyMiddleware(...middlewares)];

const store = createStore(persistedReducer, compose(...enhancers));

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
