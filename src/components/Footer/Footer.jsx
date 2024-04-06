import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import "./footer.css";


const Footer = () => {

    const [version, setVersion] = useState(false)
    const [newVersion, setNewVersion] = useState(false)
    const [right, setRight] = useState(false)
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
        axios({
            url: serverAddres("manage/update-download.php"),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify({
                link: `https://update.people-ua.org/version/${newVersion}.zip`,
                newVersion: newVersion
            }),
        })
            .then((data) => {
                console.log(data)
                // window.location.reload()
            })
            .catch((error) => console.log(error))
    }
    return (
        <footer>
            <div className="footer">
                <div className="footer__top">
                    <div className="footer__top__line">
                        <p className="footer__contact">Якшо виникли проблеми, пропозиції - пишіть на поштову скриньку </p>
                        <a href="mailto:teenitclub@gmail.com">teenitclub@gmail.com</a>
                    </div>
                    <div className="footer__top__line">
                        <p className="footer__contact">Якшо питання супер термінове дзвоніть за номером</p>
                        <a href="tel:+380932080760">+380932080760</a>
                    </div>
                </div>
                <div className="footer__bottom">
                    <span>
                    <p className="footer__contact"><b>Version - {version}</b></p>
                    {newVersion > version ? <p>Доступне оновлення {newVersion}</p> : <p>У вас остання версія програми</p>}
                    {newVersion > version && right ? <button onClick={() => {
                        updateCaseManager();
                    }}>Оновити програму</button> : ""}
                    </span>
                    
                    <p className="copyright">© Case Manager | 2022 | powered by <a href="https://studio.itclub.in.ua">Studio IT Club</a></p>

                </div>
            </div>
        </footer>
    )
}
export default Footer;