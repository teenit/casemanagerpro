import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/userSlice";
import accessReducer from "./Slices/accessSlice";

export const store = configureStore({
    reducer:{
        user:userReducer,
        access:accessReducer
    }
})