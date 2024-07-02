import React, { useState } from "react";
import { LANG, appConfig } from "../../../services/config";
import { Button, Checkbox } from "@material-ui/core";
import { apiResponse } from "../../Functions/get_apiObj";

const CaseSettings = ({views}) => {

    const VIEWS = appConfig.caseViewSettings;
    const [state, setState] = useState({
        ...views
    })

    const saveHandler = () => {

       
    }

    return(
        <div>
            {
                VIEWS.map((item)=>{

                    return(
                        <div key={item}>
                            <label>
                                <Checkbox onChange={(e)=>{
                                    console.log(e)
                                    setState({...state, [item]: e.target.checked})
                                }} checked={state[item] == undefined ? true : state[item]} />
                            {LANG.case_view_settings[item]}
                            </label>
                        </div>  
                    )
                })
            }
            <Button onClick={()=>console.log(state)}>{LANG.GLOBAL.save}</Button>
        </div>
    )
}

export default CaseSettings;