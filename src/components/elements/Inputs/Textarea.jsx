import { TextField } from "@mui/material";
import React from "react";

const Textarea = ({value="", onChange, label=""}) =>{
const getValue = (val)=>{
    if (!val) return ''
}
const newVal = getValue(value)
    return (
        <div className="TextArea">
            
            <TextField
                label={label}
                value={newVal}
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