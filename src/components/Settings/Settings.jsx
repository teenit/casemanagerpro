import React from "react";
import SetUser from "./SetUser/SetUser";
import "./settings.css"
import SetCategories from "./SetCase/SetCategories";
import SetContactCategory from "./SetContactCategory";
import LoadingPage from "../Loading/LoadingPage";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { serverAddres } from "../Functions/serverAddres";
import SetEvent from "./SetEvent/SetEvent";
import SettingsCategory from "./SettingsCategory/SettingsCategory";
import ListCategories from "./SettingsCategory/ListCategories";
import { apiResponse } from "../Functions/get_apiObj";
import { Accordion, AccordionDetails, AccordionSummary, Button, Switch } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Icon from "../elements/Icons/Icon";
import AccordionBlock from "../elements/Accordions/AccordionBlock";
import Input from "../elements/Inputs/Input";
import Hint from "../elements/Hints/Hint"
import { appConfig, LANG } from "../../services/config";
import SetConfigItem from "./SetConfig/SetConfigItem";
const MODE = 'settings_page_';
const Settings = () => {

    const [page, setPage] = useState({ loading: true, effload: false, message: "" })
    const [categories, setCategories] = useState([]);
    const [categoriesCont, setCategoriesCont] = useState([]);
    const [version, setVersion] = useState(false)
    const [newVersion, setNewVersion] = useState(false)
    const [disBtn, setDisBtn] = useState(false)
    const [config, setConfig] = useState({...appConfig.defaultConfig})
    const [activeConfig, setActiveConfig] = useState({})
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
        apiResponse({}, "manage/get-version.php").then((data) => {
                setVersion(data.version);
                checkVersion()
        })
        apiResponse({}, "config/get-active-config.php").then((res)=>{
            
            if (res.status) setActiveConfig({...res.configs})
        })
    }, []);
    function updateCaseManager() {
        apiResponse({
            link: `https://update.people-ua.org/version/${newVersion}.zip`,
            newVersion: newVersion
        }, "manage/update-download.php").then((res) => {
            window.location.reload()
        })
    }

    const [expanded, setExpanded] = useState({
        users: localStorage.getItem(MODE + 'users') ? !!+localStorage.getItem(MODE + 'users') : false,
        categories: localStorage.getItem(MODE + 'categories') ? !!+localStorage.getItem(MODE + 'categories') : false,
        events: localStorage.getItem(MODE + 'events') ? !!+localStorage.getItem(MODE + 'events') : false,
        config: localStorage.getItem(MODE + 'config') ? !!+localStorage.getItem(MODE + 'config') : false,
    });

    const expandedChange = (type) => {
        localStorage.setItem(MODE + type, !expanded[type] ? 1 : 0);
        setExpanded({ ...expanded, [type]: !expanded[type] })
    }


    useEffect(() => {
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres('user/page-setting.php'),
            method: "POST",
            header: { 'Content-Type': 'application/json;charset=utf-8' },
            data: JSON.stringify(obj),
        })
            .then((data) => {
                if (data.data?.message) {
                    setPage({
                        effload: false,
                        message: data.data.message,
                        loading: true
                    })
                } else {
                    setPage({ loading: false })
                }
            })
            .catch((error) => console.log(error))
    }, [])
    const [settingsData, setSettingsData] = useState({
        phone: "",
        email: "",
        key: "",
        auth:false,
        lightTheme:true
    })
    const initialSettingsData = {...settingsData}
    const settingsHandler = (key, value) => {
        setSettingsData({ ...settingsData, [key]: value })
    }
    const saveConfig = ()=>{
        apiResponse({config: config}, "config/create.php").then((res)=>{
            console.log(res)
        })
    }

    const getConfig = () => {
        apiResponse({}, "config/get-active-config.php").then((res)=>{
            
            if (res.status) setActiveConfig({...res.configs})
        })
    }
    const generateKey = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 15; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        settingsHandler("key", result)
    }

    const saveConfigItem = (key, value) => {
        const sendValue = typeof value == 'boolean' && value ? 1 : 0;
        apiResponse({
            key: key,
            value: sendValue
        }, "config/create-config.php").then((res)=>{
            if(res.status) getConfig()
        })
    }
   
    return page.loading ? (
        <div className="page__loading">
            <LoadingPage message={page.message} effload={page.effload} />
        </div>
    ) : (
        <div className="page">
            <div className="page__title">
                <h1>Налаштування</h1>
            </div>
            <div className="SettingsPage-accordion">
                {newVersion > version && 
                    <Button disabled={disBtn} onClick={()=>{
                        setDisBtn(true)
                        updateCaseManager();
                    }}>{LANG.footer.update} до версії <b style={{paddingLeft:"10px"}}> { newVersion}</b></Button>}
                <Accordion expanded={expanded.users} id="expanded_users" onChange={() => {
                    expandedChange('users')
                }}>
                    <AccordionSummary expandIcon={<Icon icon={'arrow_down'} />}>
                        Користувачі
                    </AccordionSummary>
                    <AccordionDetails>
                        <SetUser categories={categories} categoriesCont={categoriesCont} />
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded.categories} id="expanded_categories" onChange={() => {
                    expandedChange('categories')
                }}>
                    <AccordionSummary expandIcon={<Icon icon={'arrow_down'} />}>
                        Категорії
                    </AccordionSummary>
                    <AccordionDetails>
                        <SettingsCategory
                            title={LANG.SETTINGS.title_category_case}
                            categoryColor="#1976d2"
                            categoryKey="case"
                        />
                        <SettingsCategory
                            title={LANG.SETTINGS.title_category_case_helps}
                            categoryColor="#1976d2"
                            categoryKey="case_helps"
                        />
                        <SettingsCategory
                            title={LANG.SETTINGS.title_category_groups}
                            categoryColor="#1976d2"
                            categoryKey="groups"
                        />
                    </AccordionDetails>
                </Accordion>

                <Accordion expanded={expanded.events} id="expanded_events" onChange={() => {
                    expandedChange('events')
                }}>
                    <AccordionSummary expandIcon={<Icon icon={'arrow_down'} />}>
                        Події
                    </AccordionSummary>
                    <AccordionDetails>
                        <SetEvent />
                    </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded.config} id="expanded_config" onChange={() => {
                    expandedChange('config')
                }}>
                    <AccordionSummary expandIcon={<Icon icon={'arrow_down'} />}>
                        Конфігурації програми
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <AccordionBlock disabled = {JSON.stringify(initialSettingsData)==JSON.stringify(settingsData)} title={"Системні налаштування"}>
                            <div className="accordion__item">
                                <span>
                                    <div>Номер телефону</div>
                                    <Hint text={LANG.hints.phone} />
                                </span>

                                <Input type="number" value={settingsData.phone} onChange={(e)=>{settingsHandler("phone", e.target.value)}}/>
                            </div>
                            <div className="accordion__item">
                                <span>
                                <div>Електронна пошта</div>
                                <Hint text={LANG.hints.email} />
                                </span>
                                <Input type="text" value={settingsData.email} onChange={(e)=>{settingsHandler("email", e.target.value)}}/>
                            </div>
                            <div className="accordion__item">
                                <div>Ключ шифрування</div>
                                <span>
                                    <Button variant="contained" onClick={generateKey}>Сгенерувати ключ</Button>
                                    <Input type="text" onChange={(e) => { settingsHandler("key", e.target.value) }} value={settingsData.key} />
                                </span>
                            </div>
                        </AccordionBlock> */}
                        <AccordionBlock title={"Загальні налаштування"}>
                            {
                                config.system.map((item)=><SetConfigItem 
                                                            key={item.config_key} 
                                                            type={item.type} 
                                                            label={item.label} 
                                                            description={item.description}
                                                            value={activeConfig[item.config_key] !== undefined ? activeConfig[item.config_key] : item.value} 
                                                            config_key={item.config_key} 
                                                            onChange = {(value)=>{
                                                                saveConfigItem(item.config_key, value)
                                                            }}
                                                            />)
                            }
                          
                        </AccordionBlock>
                    </AccordionDetails>
                    <Button onClick={saveConfig}>Зберегти</Button>
                </Accordion>
            </div>

        </div>

    )
}
export default Settings;