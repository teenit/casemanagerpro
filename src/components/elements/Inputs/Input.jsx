import { TextField } from "@mui/material";
import React from "react";

const Input = ({value="", onChange, label="", type="text"}) =>{

    return (
        <div className="Input">
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                className="test"
                type={type}
            />
        </div>
    )
}

export default Input;