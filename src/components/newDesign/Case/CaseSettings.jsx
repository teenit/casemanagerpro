import React, { useEffect, useState } from "react";
import { LANG, appConfig } from "../../../services/config";
import { Button, Checkbox } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { apiResponse } from "../../Functions/get_apiObj";
import SmallNotification from "../../elements/Notifications/SmallNotification";

const BlueCheckbox = withStyles({
    root: {
        color: "#1976d2",
        '&$checked': {
            color: "#1976d2",
        },
        '&:hover': {
            color: "#005bb5",
        },
    },
    checked: {},
})(Checkbox);

const BlueButton = withStyles({
    root: {
        backgroundColor: "#1976d2",
        color: "#fff",
        '&:hover': {
            backgroundColor: "#005bb5",
        },
    },
})(Button);

const CaseSettings = ({ views, successHandler }) => {
    const VIEWS = appConfig.caseViewSettings;
    const [state, setState] = useState({});
    useEffect(() => {
       setState({...views})
    }, []);


    const changeHandler = (key, value) => {
        setState({ ...state, [key]: value });
    };
    const saveHandler = ()=>{
        successHandler()
    }

    return (
        <div>
            {VIEWS.map((item) => {
                return (
                    <div key={item}>
                        <label>
                            <BlueCheckbox 
                                onChange={(e) => { changeHandler(item, e.target.checked); }}
                                checked={state[item] === undefined ? true : state[item]} 
                            />
                            {LANG.case_view_settings[item]}
                        </label>
                    </div>
                );
            })}
            <BlueButton variant="contained" onClick={saveHandler}>{LANG.GLOBAL.save}</BlueButton>
        </div>
    );
}

export default CaseSettings;
