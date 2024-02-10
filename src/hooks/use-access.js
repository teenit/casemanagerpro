import {useSelector} from 'react-redux';
import React from 'react';
import { Check } from '../components/Auth/Check';
export function useAccess(){
    const {token, access, id}= useSelector(state => state.user)
    return {
        token,
        id,
        access
    }
}
