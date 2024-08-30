import React, { useEffect, useState } from "react";
import { LANG, appConfig } from "../../../services/config";
import Icon from "../../elements/Icons/Icon";
import { apiResponse } from "../../Functions/get_apiObj";
import { Button, Checkbox } from "@mui/material";

const CaseSettings = ({ views, successHandler }) => {
    const { caseViewSettings } = appConfig;
    const [state, setState] = useState({ ...views });

    const changeHandler = (key, value) => {
        setState({ ...state, [key]: value });
    };

    const handleSave = () => {
        //  return  console.log(state)
        apiResponse({
            value: JSON.stringify(state),
            key: "case_view_info"
        }, "manage/update-usermeta.php").then((res) => {
            console.log(res)
        })
        successHandler();
        window.location.reload();
    };
    const [settings, setSettings] = useState({
        primary:null,
        options:null,
    })
    useEffect(()=>{
        const primary = caseViewSettings.filter(item=>!item?.options)
        const options = caseViewSettings.filter(item=>item?.options)
        setSettings({...settings, primary:primary, options:options})
    },[caseViewSettings])
    return (
        <div className="CaseSettings">
            <div className="CaseSettings-inner">

                <div className="CaseSettings-inner-left">
                {settings.primary && settings.primary.length>0 && settings.primary.map((item, index) => {
                return <label key={index}>
                        <Checkbox
                            onChange={(e) => { changeHandler(item.primary, e.target.checked); }}
                            checked={(state[item.primary] === undefined || state[item.primary]) ? true : state[item.primary]}
                        />
                        {LANG.case_view_settings[item.primary]}
                    </label>
            })}
                </div>
                <div className="CaseSettings-inner-right">
                {settings.options && settings.options.length>0 && settings.options.map((item, index) => {
                return <div key={item.primary}>
                    <label className="CaseSettings-inner-right-primary">
                        <Checkbox
                            onChange={(e) => { changeHandler(item.primary, e.target.checked); }}
                            checked={(state[item.primary] === undefined || state[item.primary]) ? true : state[item.primary]}
                        />
                        {LANG.case_view_settings[item.primary]}
                    </label>
                    {
                        item?.options && item.options.map((option) => {
                            return <label style={{ paddingLeft: "40px" }} key={option}>
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
                </div>
            </div>
            <Button variant="contained" onClick={handleSave}>{LANG.GLOBAL.save}</Button>

            
        </div>
    );
};

export default CaseSettings;
