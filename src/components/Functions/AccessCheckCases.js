import { useDispatch, useSelector } from "react-redux"
import React from "react";

const AccessCheckCases = (cases) => {
    const rights = useSelector(state => state.auth);
    // if ((rights.a_super == 1 || rights.a_administartor == 1) && !!rights.a_blocked == false) return true;
    let newCases = [...cases]
    let test = 7
    switch (test){
        case 0:
            return {cases:[],edit:false}
        case 7:
            return {cases:newCases,edit:false}
        case 8:
            return {cases:newCases,edit:true}
        default:
            break
    }
   
}

export default AccessCheckCases;