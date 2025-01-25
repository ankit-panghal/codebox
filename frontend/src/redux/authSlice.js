import { createSlice } from "@reduxjs/toolkit";
const initialState = false;

const authSlice = createSlice({
    initialState ,
    name : 'auth',
    reducers : {
        manageAuth : (state,action) => {
            return action.payload
        }
    }
})

export const {manageAuth} = authSlice.actions;
export default authSlice.reducer; 