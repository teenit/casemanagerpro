import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    access:null
}
const accessSlice = createSlice({
    name:"access",
    initialState,
    reducers:{
        setAccess(state,action){
            state.access = action.payload.access
        },
        removeAccess(state){
            state.access = null            
        }
    }
})
export const {setAccess, removeAccess} = accessSlice.actions;

export default accessSlice.reducer;