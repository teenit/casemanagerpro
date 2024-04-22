import { TextField } from "@mui/material";
import React from "react";

const Input = ({value="", onChange, label="", type="text", variant="outlined"}) =>{

    return (
        <div className="Input">
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                className="test"
                variant={variant}
                type={type}
            />
        </div>
    )
}

export default Input;