import { Input } from "@mui/material";
import React from "react";
const InputPassword = ({value="", onChange, label="", type="text", variant="outlined", disabled=false, addClass="", size="normal", multiline = false}) =>{

    return (
        <div className={`Input ${addClass}`}>
            <Input
                label={label}
                value={value}
                onChange={onChange}
                className={addClass}
                variant={variant}
                type={type}
                size={size}
                disabled={disabled}
                multiline
            />
        </div>
    )
}

export default InputPassword;