import {createSlice} from '@reduxjs/toolkit';

const initialState = 0;
const skipSlice = createSlice({
   name : 'skip',
   initialState,
   reducers : {
    manageSkips(state,action){
     return state = action.payload
    }
   }
})

export const {manageSkips} = skipSlice.actions;
export default skipSlice.reducer;
