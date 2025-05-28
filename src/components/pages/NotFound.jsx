import React from "react";
import { LANG } from "../../services/config";

const NotFound = () => {

    return (
        <div className="NotFound">
            <div className="NotFound-title">404</div>
            <div className="NotFound-text">{LANG.NOT_FOUND.start} <a href="/">{LANG.NOT_FOUND.end}</a>.</div>
        </div>
    )
}

export default NotFound;