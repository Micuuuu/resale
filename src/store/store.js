import {compose, createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'; // ne ajuta sa vedem ce valori avem in state si care este actiunea

// redux persist
import { persistStore,persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
//root reducer
import { rootReducer } from './root-reducer';
// curryFunc  - curry function - o functie care iti returneaza tot o functie

const middleware = [process.env.NODE_ENV ==='production' && logger].filter(Boolean) // un fel de librarii ajutatoare care ruleaza inainte ca o actiune sa declanseze reducer-ul
const composedEnhancers = compose(applyMiddleware(...middleware))

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store) 