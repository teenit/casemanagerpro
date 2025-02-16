import { TextField } from "@mui/material";
import React from "react";
const Input = ({value="", onChange, label="", type="text", variant="outlined", disabled=false, addClass="", size="normal"}) =>{

    return (
        <div className={`Input ${addClass}`}>
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                className={addClass}
                variant={variant}
                type={type}
                size={size}
                disabled={disabled}
            />
        </div>
    )
}

export default Input;