import React from "react";
import loadImg from "../../img/loading_3.gif"
const LoadingPage = (
    {
        message, effload, addClass = "", loadingTable = false
    }
) => {
    return (
        <div className={`${loadingTable ? "" : "LoadingPage"} ${addClass}`}>
            <div className={"LoadingPage-container"}>
                <div className="LoadingPage-container-info">
                    {effload === true ? <img src={loadImg} alt="" /> : <h3>{message}</h3>}
                </div>
            </div>
        </div>
    )
}
export default LoadingPage;