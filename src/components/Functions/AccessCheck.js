import { useDispatch, useSelector } from "react-redux"
import React from "react";

const AccessCheck = (type, right) => {
    const dispatch = useDispatch();
    const rights = useSelector(state => state.auth);
    if ((rights.a_super == 1 || rights.a_administartor == 1) && !!rights.a_blocked == false) return true;
    if (type == 'page') {

        if (!!rights[right]) return true;
        
        return false;
    }
    if(type == 'yes_no'){

        return !!rights[right]
    }
    return true
}

export default AccessCheck;