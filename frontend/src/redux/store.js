import { configureStore } from '@reduxjs/toolkit';
import skipReducer from './skipSlice';
import arenasReducer from './arenasSlice'
import authReducer from './authSlice'
const  store = configureStore({
reducer : {
    skip : skipReducer,
    arenas : arenasReducer,
    auth : authReducer
}
})

export default store;