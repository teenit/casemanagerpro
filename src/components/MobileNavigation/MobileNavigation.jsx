import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../elements/Icons/Icon";

const MobileNavigation = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goForward = () => {
        navigate(1);
    };

    const reloadPage = () => {
        navigate(0);
    };

    return (
        <div className="MobileNavigation">
            <div className="MobileNavigation-container">
                <Icon icon={"arrow_back"} addClass={"MobileNavigation-icon"} onClick={goBack}/>
                <Icon icon={"replay"} addClass={"MobileNavigation-icon"} onClick={reloadPage}/>
                <Icon icon={"arrow_next"} addClass={"MobileNavigation-icon"} onClick={goForward}/>
            </div>
        </div>
    );
};

export default MobileNavigation;
