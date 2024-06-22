import { useDispatch, useSelector } from "react-redux"
import React from "react";

const AccessCheck = (type, right) => {
    const dispatch = useDispatch();
    const rights = useSelector(state => state.auth);
 
    if (type == 'page') {
        if ((rights.a_super == 1 || rights.a_administartor == 1) && !!rights.a_blocked == false) return true;

        if (!!rights[right]) return true;
        
        return false;
    }
    return true
}

export default AccessCheck;