import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./Slices/userSlice";
import accessReducer from "./Slices/accessSlice";
import categoriesReducer from "../reducers/categories";
import authReducer from "../reducers/auth";
import fieldsReducer from "../reducers/fields";

export const store = configureStore({
    reducer:{
        user:userReducer,
        access:accessReducer,
        categories: categoriesReducer,
        auth: authReducer,
        fields: fieldsReducer,

    }
})