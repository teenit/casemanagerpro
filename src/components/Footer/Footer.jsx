import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./footer.css";
import { apiResponse } from "../Functions/get_apiObj";
import { LANG } from "../../services/config";
import logo from "../../img/logo.svg";
import facebook from "../../img/icons/facebook.svg"
import instagram from "../../img/icons/instagram.svg"
import telegram from "../../img/icons/telegram.svg"
import moment from "moment";

const Footer = () => {
    const currentYear = moment().format("yyyy")
    const [version, setVersion] = useState(false)
    const [newVersion, setNewVersion] = useState(false)

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
        apiResponse({},"manage/get-version.php").then((res)=>{
            setVersion(res.version);
            checkVersion()
        })
    }, [])

    return (
        <footer>
            <div className="footer">
                <div className="footer__top">

                    <div className="footer__top__row">
                        <div className="footer__top__logo">
                            <a href="/"><img src={logo} alt={LANG.footer.logo} /></a>
                            <span>Case Manager</span>
                        </div>
                        <div className="footer__gray">{LANG.footer.contacts}</div>
                    </div>
                    <div className="footer__top__contacts">
                        <div className="footer__top__contact">
                            <div className="footer__contact">{LANG.footer.email}</div>
                            <a href="mailto:teenitclub@gmail.com">teenitclub@gmail.com</a>
                        </div>
                        <div className="footer__top__contact">
                            <div className="footer__contact">{LANG.footer.phone}</div>
                            <a href="tel:+380932080760">+380932080760</a>

                        </div>
                    </div>

                </div>
                <div className="footer__bottom">
                    {/* <span>
                        <p><b>Version - {version}</b></p>
                        {newVersion > version ? <p>{LANG.footer.updateAvaible} {newVersion}</p> : <p>{LANG.footer.lastVersion}</p>}

                    </span> */}

                    <div className="footer__copyright">
                        <div className="footer__copyright__text">© Case Manager | {currentYear} | powered by <a href="https://studio.itclub.in.ua" target="_blank">IT Club Studio</a></div>
                        {/* <div className="footer__socials">
                            <a href="#"><img src={facebook} alt={LANG.footer.facebook} /></a>
                            <a href="#"><img src={instagram} alt={LANG.footer.instagram} /></a>
                            <a href="#"><img src={telegram} alt={LANG.footer.telegram} /></a>
                        </div> */}
                    </div>

                </div>
            </div>
        </footer>
    )
}
export default Footer;