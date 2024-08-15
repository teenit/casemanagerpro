import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import "./footer.css";
import { apiResponse } from "../Functions/get_apiObj";
import { LANG } from "../../services/config";
import logo from "../../img/logo.svg";
import facebook from "../../img/icons/facebook.svg"
import instagram from "../../img/icons/instagram.svg"
import telegram from "../../img/icons/telegram.svg"

const Footer = () => {

    const [version, setVersion] = useState(false)
    const [newVersion, setNewVersion] = useState(false)
    const [right, setRight] = useState(false)
    const [disBtn, setDisBtn] = useState(false)
    function checkVersion() {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: "https://update.people-ua.org/check-update.php",
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                data.data > version ? setNewVersion(data.data) : setNewVersion(false)
            })
            .catch((error) => console.log(error))
    }
    useEffect(() => {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres("manage/get-version.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                if (!data.data?.message) setRight(true)
                setVersion(data.data.version);
                checkVersion()
            })
            .catch((error) => console.log(error))
    }, [])


    function updateCaseManager() {
        apiResponse({
            link: `https://update.people-ua.org/version/${newVersion}.zip`,
            newVersion: newVersion
        }, "manage/update-download.php").then(() => {
            window.location.reload()
        })
        // axios({
        //     url: serverAddres("manage/update-download.php"),
        //     method: "POST",
        //     header: { 'Content-Type': 'application/json;charset=utf-8' },
        //     data: JSON.stringify({
        //         link: `https://update.people-ua.org/version/${newVersion}.zip`,
        //         newVersion: newVersion
        //     }),
        // })
        //     .then((data) => {
        //         // window.location.reload()
        //     })
        //     .catch((error) => console.log(error))
    }
    return (
        <footer>
            <div className="footer">
                <div className="footer__top">

                    <div className="footer__top__column">
                        <div className="footer__top__logo">
                            <a href="/"><img src={logo} alt="Логотип Case Manager" /></a>
                            <span>Case Manager</span>
                        </div>
                        <p className="footer__contact">{LANG.footer.email}</p>
                        <p className="footer__contact">{LANG.footer.phone}</p>

                    </div>
                    <div className="footer__top__column">
                        <div className="footer__gray">Наші контакти:</div>
                        <a href="mailto:teenitclub@gmail.com">teenitclub@gmail.com</a>
                        <a href="tel:+380932080760">+380932080760</a>
                    </div>

                </div>
                <div className="footer__bottom">
                    <span>
                        <p className="footer__contact"><b>Version - {version}</b></p>
                        {newVersion > version ? <p>{LANG.footer.updateAvaible} {newVersion}</p> : <p>{LANG.footer.lastVersion}</p>}
                        {newVersion > version && right && <button disabled={disBtn} onClick={() => {
                            setDisBtn(true)
                            updateCaseManager();
                        }}>{LANG.footer.update}</button>}
                    </span>

                    <div className="footer__copyright">
                        <div className="footer__copyright__text">© Case Manager | 2024 | powered by <a href="https://studio.itclub.in.ua" target="_blank">IT Club Studio</a></div>
                        <div className="footer__socials">
                            <a href="#"><img src={facebook} alt="Посилання на Facebook" /></a>
                            <a href="#"><img src={instagram} alt="Посилання на Instagram" /></a>
                            <a href="#"><img src={telegram} alt="Посилання на Telegram" /></a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    )
}
export default Footer;