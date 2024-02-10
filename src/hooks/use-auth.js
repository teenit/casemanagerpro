import {useSelector} from 'react-redux';
import React from 'react';
import { Check } from '../components/Auth/Check';
export function useAuth(){
    const {email,id,data,token, userName}= useSelector(state => state.user)
    return {
        isAuth: !!id,
        email,
        token,
        id,
        data,
        userName
    }
}
