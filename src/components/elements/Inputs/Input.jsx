import { TextField } from "@mui/material";
import React from "react";
const Input = ({value="", onChange, label="", type="text", variant="outlined", disabled=false, addClass=""}) =>{

    return (
        <div className={`Input ${addClass}`}>
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                className={addClass}
                variant={variant}
                type={type}
                disabled={disabled}
            />
        </div>
    )
}

export default Input;