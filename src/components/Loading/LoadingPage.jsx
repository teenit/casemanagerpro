import React from "react";
import s from "./Loadingpage.module.css";
import loadImg from "../../img/loading_3.gif"
const LoadingPage = (
    {
        message, effload
    }
) => {
    return (
        <div className="block__loading">
            <div className={s.loading__container}>
                <div className="loading__info">
                    {effload === true ? <img src={loadImg} alt="" /> : <h3>{message}</h3>}
                </div>
            </div>
        </div>
    )
}
export default LoadingPage;