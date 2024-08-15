import React, { useState } from "react";
import Icon from "../Icons/Icon";
import { LANG } from "../../../services/config";
import { Button } from "@mui/material";

const AccordionBlock = (props) => {

    const [open, setOpen] = useState(false);
    return (
        <div className="AccordionBlock">
            <div className={`AccordionBlock-header ${open ? " opened" : ""}`} onClick={() => setOpen(!open)}>
                <div className="AccordionBlock-header-title">{props.title}</div>
                <div className="AccordionBlock-header-panel">

                    {/* <Button disabled={props.disabled} variant="contained">{LANG.GLOBAL.save}</Button> */}
                    <div className="AccordionBlock-header-icon"><Icon icon={'arrow_down'} /></div>
                </div>
            </div>
            {
                open &&
                <div className="AccordionBlock-body">
                    {props.children}
                </div>
            }

        </div>
    )
}

export default AccordionBlock