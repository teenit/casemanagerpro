import { TextField } from "@mui/material";
import React from "react";

const Textarea = ({value="", onChange, label=""}) =>{

    return (
        <div className="TextArea">
            
            <TextField
                label={label}
                value={value}
                onChange={onChange}
                multiline={true}
                minRows={3}
                maxRows={5}
                className="w100"
            />
        </div>
    )
}

export default Textarea;