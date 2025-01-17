import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    total : null,
    portion : null
};
const arenasSlice = createSlice({
    name : 'arenas',
    initialState,
    reducers : {
        getArenas(state,action){
         return {...state, total : action.payload}
        },
        getPageArenas(state,action){
             return {...state, portion : action.payload}
        }
    }
})

export const {getArenas,getPageArenas} = arenasSlice.actions;
export default arenasSlice.reducer;