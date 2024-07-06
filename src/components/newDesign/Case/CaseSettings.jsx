import React, { useEffect, useState } from "react";
import { LANG, appConfig } from "../../../services/config";
import Icon from "../../elements/Icons/Icon";
import { apiResponse } from "../../Functions/get_apiObj";
import { Button, Checkbox } from "@mui/material";

const CaseSettings = ({ views, successHandler }) => {
    const { caseViewSettings } = appConfig;
    const [state, setState] = useState({...views});

    const changeHandler = (key, value) => {
        setState({...state, [key]: value});
    };

    const handleSave = () => {
    //  return  console.log(state)
        apiResponse({
            value: JSON.stringify(state),
            key: "case_view_info"
        },"manage/update-usermeta.php").then((res)=>{
            console.log(res)
        })
        successHandler();
        window.location.reload();
    };

    return (
        <div className="CaseSettings">
            {caseViewSettings.map((item, index) => {
               return <div key={item.primary}>
                <label >
                    <Checkbox
                        onChange={(e) => { changeHandler(item.primary, e.target.checked); }}
                        checked={(state[item.primary] === undefined || state[item.primary]) ? true : state[item.primary]}
                    />
                    {LANG.case_view_settings[item.primary]}
                </label>
                {
                    item?.options && item.options.map((option)=>{
                   return <label style={{paddingLeft:"40px", display:"block"}} key={option}>
                        <Checkbox
                            onChange={(e) => { changeHandler(option, e.target.checked); }}
                            checked={(state[option] === undefined || state[option]) ? true : state[option]}
                        />
                        {LANG.case_view_settings[option]}
                    </label>
                    })
                }
                </div>
                })}     
            <Button variant="contained" onClick={handleSave}>{LANG.GLOBAL.save}</Button>
        </div>
    );
};

export default CaseSettings;
