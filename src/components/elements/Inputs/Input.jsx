import { TextField } from "@mui/material";
import React from "react";
const Input = ({value="", onChange, label="", type="text", variant="outlined", disabled=false}) =>{

    return (
        <div className="Input">
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                className="test"
                variant={variant}
                type={type}
                disabled={disabled}
            />
        </div>
    )
}

export default Input;