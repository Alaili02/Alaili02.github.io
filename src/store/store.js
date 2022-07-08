import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
;
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

import thunk from 'redux-thunk';
import { ScheduleReducer, ThemeReducer } from './reducers.js';

const rootReducer = combineReducers({ 
    schedule: ScheduleReducer, 
    theme: ThemeReducer 
});

const persistConfig = {
    key: "root",
    storage,
    middleware: [thunk]
}
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
        reducer: persistedReducer,
        devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store)