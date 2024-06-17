import React, { useEffect, useState } from "react";
import { LANG, appConfig } from "../../../services/config";
import { useSelector } from "react-redux";
import CheckboxListAccess from "../../elements/CheckBoxes/CheckboxListAccess";

const AccessCasesCategories = (props) => {
    const categoriesCase = useSelector(state => state.categories[props.list]);
    const [state, setState] = useState({
        type: props.type,
        accesses: props.accesses
    })
   

    useEffect(()=>{
        setState({...state, accesses: props.accesses})
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
                {
                    access.map((item, index)=> {
                        return(
                            <div key={index}>{LANG.access[item]}    
                                <CheckboxListAccess
                                    allMas={()=>{return categoriesCase}} 
                                    checkedMas={
                                        typeof state.accesses[item] === "string" ? JSON.parse(state.accesses[item]) : []
                                    }
                                    onChange={(value)=>{
                                        handleCheckboxChange(value,typeof state.accesses[item] === "string" ? JSON.parse(state.accesses[item]) : [], item)}}
                                />
                        </div>
                        )
                    })
                }
        </div>
    )
}
export default AccessCasesCategories;