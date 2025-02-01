import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {persistStore,persistReducer,FLUSH,REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import skipReducer from './skipSlice';
import authReducer from './authSlice'
import apiSlice from './apiSlice';

const persistConfig = {
    key : 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig,combineReducers({
    skip : skipReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
}))
const  store = configureStore({
    reducer : persistedReducer,
    middleware : (mid) => mid({
        serializableCheck : {
            ignoreActions : [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(apiSlice.middleware)
})

const persistor = persistStore(store)
export {store,persistor}