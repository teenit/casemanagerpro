import {createSlice} from '@reduxjs/toolkit';



const initialState = {
    userName:localStorage.getItem("userName"),
    token:localStorage.getItem("token"),
    id:localStorage.getItem("id"),
    data:localStorage.getItem("data"),
    email:localStorage.getItem("email"),
    profilePhoto:localStorage.getItem("profilePhoto")
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser(state,action){
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
            state.data = action.payload.data
            state.userName = action.payload.userName
            state.profilePhoto = action.payload.profilePhoto
        },
        removeUser(state){
            state.email = null
            state.token = null
            state.id = null
            state.data = null
            state.userName = null
            state.profilePhoto = null
            localStorage.clear()
            if(window.location.pathname !== "/recovery" && window.location.pathname !== "/start") window.location.href="/login"
            
        }
    }
})
export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;