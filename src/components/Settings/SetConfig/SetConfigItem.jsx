import { Switch } from "@mui/material";
import React from "react";

const SetConfigItem = ({type, label="", description="", value=null, config_key, onChange}) => {
    const getValue = (val) => {
        if (val == '1' || val == '0') return val == 1 ? true : false
    
        return val;
    }
    
    let val = getValue(value);
    return(
        <div className="SetConfigItem">
            {
                type === "boolean" && (
                    <>
                    <div className="SetConfigItem-text">
                        <div className="SetConfigItem-text-label">{label}</div>
                        <div className="SetConfigItem-text-description">{description}</div>
                    </div>
                    <div className="SetConfigItem-control">
                        <Switch checked={val} onChange={(e)=>{
                            onChange(e.target.checked) 
                        }}/>
                    </div>
                    </>
                 
                )
            }
        </div>
    )
}

export default SetConfigItem;