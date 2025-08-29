import { TextField } from "@mui/material";
import React from "react";

const Textarea = ({ value = "", onChange, label = "", addClass="" }) => {
    return (
        <div className={`TextArea ${addClass}`}>
            <TextField
                label={label}
                value={value || ""}
                onChange={onChange}
                multiline={true}
                minRows={3}
                // maxRows={7}
                className="w100"
            />
        </div>
    );
};

export default Textarea;
