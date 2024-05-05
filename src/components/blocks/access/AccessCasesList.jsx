import React, { useEffect, useState } from "react";
import { LANG, appConfig } from "../../../services/config";
import Checkbox from '@mui/material/Checkbox';
import { Switch } from "@mui/material";
import { useSelector } from "react-redux";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";
import { apiResponse } from "../../Functions/get_apiObj";

const AccessCasesList = (props) => {
    const [categoriesCase, setCategoriesCase] = useState([])
    const [state, setState] = useState({
        type: props.type,
        accesses: props.accesses,

    })
    useEffect(()=>{
        apiResponse({},"access/get-cases-name.php").then((data)=>{
            setCategoriesCase([...data])
        })
    },[]);

    useEffect(()=>{
        setState({...state, accesses: props.accesses});
    },[props.accesses]);

    const handleCheckboxChange = (value, options, key) => {
        let categories = [];
        if (options.includes(value)) {
          categories = options.filter(element => element !== value);
          
        } else {
          categories = [...options, value];
        }
       // setState({...state, [key]:{...state[key], value: value}})
        props.changeAccess(JSON.stringify(categories), key)
      };
   const access = appConfig.newAccess.accessCases[state.type]

    return (
        <div className="AccessCasesCategories">
            <hr />
                {categoriesCase.length > 0 &&
                    access.map((item)=> {
                        return(
                            <div key={item}>{LANG.access[item]}
                            <CheckboxListAccess
                                allMas={()=>{return categoriesCase}} 
                                checkedMas={typeof state.accesses[item] === "string" ? JSON.parse(state.accesses[item]) : []}
                                onChange={(value)=>{
                                    //return console.log(value, options, elem.key)
                                    handleCheckboxChange(value, typeof state.accesses[item] === "string" ? JSON.parse(state.accesses[item]) : [], item)}}
                        />
                        </div>
                        )
                    })
                }
        </div>
    )
}
export default AccessCasesList;