import { useDispatch, useSelector } from "react-redux"
import React from "react";

const AccessCheck = (type, right, option="") => {
    const rights = useSelector(state => state.auth);
    if (type === "super" && rights.a_super == 1) return true; 
    if (type === "admin" && rights.a_administartor == 1) return true; 
    if ((rights.a_super == 1 || rights.a_administartor == 1) && !!rights.a_blocked == false) return true;
    if (type == 'page') {

        if (!!rights[right]) return true;

        return false;
    }
    if (type == 'yes_no') {

        return !!rights[right]
    }
    if (type == "view_edit") {
        switch (rights[right]) {
            case 0:
                return false

            case 1:
                if (option == "edit") {
                    return false
                } else {
                    return true
                }

            case 2:
                return true

            default:
                break;
        }


    }
    return false
}

export default AccessCheck;