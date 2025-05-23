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
import Modal from "../Modals/Modal";
import FilesUploader from "../elements/Uploaders/FilesUploader";
import AccessCheck from "../Functions/AccessCheck";
import AddButton from "../elements/Buttons/AddButton"
const MODE = 'settings_page_';
const DEFAULT_TELEGRAM_BOT = {
    bot_id: null,
    bot_name: "",
    chat_id:"",
    is_active:"",
    bot_token:"",
    type: "chanel"
}
const Settings = () => {

    const [page, setPage] = useState({ loading: true, effload: false, message: "" })
    const [categories, setCategories] = useState([]);
    const [categoriesCont, setCategoriesCont] = useState([]);
    const [version, setVersion] = useState(false)
    const [newVersion, setNewVersion] = useState(false)
    const [disBtn, setDisBtn] = useState(false)
    const [config, setConfig] = useState({...appConfig.defaultConfig})
    const [activeConfig, setActiveConfig] = useState({});
    const [deleteMeta, setDeleteMeta] = useState({
        tableName: "",
        idMeta:""
    })
    const [telegramBots, setTelegramBots] = useState([]);
    const [selectedTelegramBot, setSelectedTelegramBot] = useState({
        ...DEFAULT_TELEGRAM_BOT
    }) 
    const [addNewUser, setAddNewUser] = useState(false)
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
        loadTelegramBots();
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

    const usersTab = AccessCheck("yes_no", "a_page_settings_tab_users");
    const categoriesTab = AccessCheck("yes_no", "a_page_settings_tab_categories");
    const eventsTab = AccessCheck("yes_no", "a_page_settings_tab_events");
    const configurationsTab = AccessCheck("yes_no", "a_page_settings_tab_configurations");
    const superTab = AccessCheck("yes_no", "a_page_settings_tab_super");
    const telegramTab = AccessCheck("yes_no", "a_page_settings_tab_telegram");
    const updateProgramRight = AccessCheck("yes_no", "a_update_program");

    const expandedChange = (type) => {
        localStorage.setItem(MODE + type, !expanded[type] ? 1 : 0);
        setExpanded({ ...expanded, [type]: !expanded[type] })
    }


    useEffect(() => {
        apiResponse({},'user/page-setting.php').then((data)=>{
             if (data?.data?.message) {
                    setPage({
                        effload: false,
                        message: data.data.message,
                        loading: true
                    })
                } else {
                    setPage({ loading: false })
                }
        })
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

    const deleteMetaToServer = () => {
        apiResponse({...deleteMeta}, "manage/delete_meta.php").then((res)=>{
            alert(res.message)
        })
    }

    const loadTelegramBots = () => {
        apiResponse({}, "telegram/get-telegram-bot-list.php").then((res)=>{
            if (res.status) {
                setTelegramBots([...res.data])
            }
        })
    }
   
    const addTelegramBot = () => {
       // return console.log(selectedTelegramBot)
        apiResponse({...selectedTelegramBot}, "telegram/create-telegram-bot.php").then((res)=>{
            if (res.status) {
                setSelectedTelegramBot({...selectedTelegramBot, modal: false});
            }
        })
    }

    const sendInTelegram = () => {
        // apiResponse({bot_id: 1, message: "test message"}, "telegram/send-message-in-telegram.php").then((res)=>{
        //     console.log(res)
        // })
    }
    const canAddUsers = AccessCheck('yes_no', 'a_page_settings_add_user')
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
                {/* {newVersion > version && updateProgramRight &&
                    <Button disabled={disBtn} onClick={()=>{
                        setDisBtn(true)
                        updateCaseManager();
                    }}>{LANG.footer.update} до версії <b style={{paddingLeft:"10px"}}> { newVersion}</b></Button>} */}
                {usersTab && <Accordion expanded={expanded.users} id="expanded_users" onChange={() => {
                    expandedChange('users')
                }}>
                    <AccordionSummary expandIcon={<Icon icon={'arrow_down'} />}>
                        <div className="SettingsPage-accordion-jcs">
                            <div>Користувачі</div>
                            <Button size="small" variant="outlined"
                                disabled={!canAddUsers} 
                                onClick={(e)=>{
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setAddNewUser(!addNewUser)
                                }}
                            >
                                <Icon icon={"add"}/>{LANG.set_user.add_user}
                            </Button>
                        </div>
                        
                    </AccordionSummary>
                    <AccordionDetails>
                        <SetUser closeAddNewUser={()=>{setAddNewUser(false)}} addNewUser={addNewUser} categories={categories} categoriesCont={categoriesCont} />+
                    </AccordionDetails>
                </Accordion>}

                {categoriesTab && <Accordion expanded={expanded.categories} id="expanded_categories" onChange={() => {
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
                            rights={{
                                add: "a_page_settings_category_case_add",
                                remove: "a_page_settings_category_case_remove",
                            }}
                        />
                        <SettingsCategory
                            title={LANG.SETTINGS.title_category_case_helps}
                            categoryColor="#1976d2"
                            categoryKey="case_helps"
                            rights={{
                                add: "a_page_settings_category_help_add",
                                remove: "a_page_settings_category_help_remove",
                            }}
                        />
                        <SettingsCategory
                            title={LANG.SETTINGS.title_category_groups}
                            categoryColor="#1976d2"
                            categoryKey="groups"
                            rights={{
                                add: "a_page_settings_category_group_add",
                                remove: "a_page_settings_category_group_remove",
                            }}
                        />
                    </AccordionDetails>
                </Accordion>}

                {eventsTab && <Accordion expanded={expanded.events} id="expanded_events" onChange={() => {
                    expandedChange('events')
                }}>
                    <AccordionSummary expandIcon={<Icon icon={'arrow_down'} />}>
                        Події
                    </AccordionSummary>
                    <AccordionDetails>
                        <SetEvent />
                    </AccordionDetails>
                </Accordion>}
                {configurationsTab && <Accordion expanded={expanded.config} id="expanded_config" onChange={() => {
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
                    
                </Accordion>}
                {superTab && <Accordion expanded={expanded.special} id="expanded_special" onChange={() => {
                    expandedChange('special')
                }}>
                    <AccordionSummary expandIcon={<Icon icon={'arrow_down'} />}>
                        Суперадміністратор 
                    </AccordionSummary>
                    <AccordionDetails>
                        <AccordionBlock title={"Видалення запису з таблиці"}>
                            <div style={{
                                display:"flex",
                                gap:"10px",
                                flexDirection:"column"
                            }}>
                                <Input label="Table name" value={deleteMeta.tableName} onChange={(e)=>{setDeleteMeta({...deleteMeta, tableName:e.target.value})}}/>
                                <Input label="Id meta" value={deleteMeta.idMeta} onChange={(e)=>{setDeleteMeta({...deleteMeta, idMeta:e.target.value})}}/>
                                <Button variant="contained" onClick={deleteMetaToServer}>Видалити запис</Button>
                            </div>
                          
                        </AccordionBlock>
                    </AccordionDetails>
                    
                </Accordion>}
                {telegramTab && <Accordion expanded={expanded.telegram} id="expanded_telegram" onChange={() => {
                    expandedChange('telegram')
                }}>
                    <AccordionSummary expandIcon={<Icon icon={'arrow_down'} />}>
                        Налаштування з телеграм 
                    </AccordionSummary>
                    <AccordionDetails>
                        <AccordionBlock title={"Телеграм боти"}>
                            {
                                telegramBots.map((item, index)=>{
                                    return(
                                        <div key={index}>
                                        <div>{item.bot_name}</div>
                                        <div>{item.bot_token}</div>
                                        <div>{item.chat_id}</div>
                                        </div>
                                    )
                                })
                            }
                           <Button onClick={()=>{setSelectedTelegramBot({...selectedTelegramBot, modal: true})}}>Додати</Button>
                          
                        </AccordionBlock>
                    </AccordionDetails>
                    
                </Accordion>}
            </div>
            {selectedTelegramBot.modal && <Modal closeHandler={() => {setSelectedTelegramBot({...selectedTelegramBot, modal: false}) }} header={"Додати учасника"} footer={
            <>
                <Button variant="contained" color="error" onClick={() => { setSelectedTelegramBot({...selectedTelegramBot, modal: false}) }}>{LANG.GLOBAL.cancel}</Button>
                <Button variant="contained" onClick={addTelegramBot}>{LANG.GLOBAL.save}</Button>
            </>
             }>
            <div style={{paddingTop:"15px"}}>
                <Input value={selectedTelegramBot.bot_name} label="Ім'я телеграм бота" onChange={(e)=>{setSelectedTelegramBot({...selectedTelegramBot, bot_name: e.target.value})}}/>
            </div>
            <div>
                <Input value={selectedTelegramBot.bot_token} label="Токен телеграм бота" onChange={(e)=>{setSelectedTelegramBot({...selectedTelegramBot, bot_token: e.target.value})}}/>
            </div>
            <div>
                <Input value={selectedTelegramBot.chat_id} label="Chat ID телеграм бота" onChange={(e)=>{setSelectedTelegramBot({...selectedTelegramBot, chat_id: e.target.value})}}/>
            </div>
            <div>
                <label htmlFor=""> Активувати
                <Switch 
                    
                    checked={selectedTelegramBot.is_active == 1 ? true : false}
                    onChange={(e)=>{
                        setSelectedTelegramBot({...selectedTelegramBot, is_active: e.target.checked ? 1 : 0})
                    }}
                /></label>
            </div>
        </Modal>}
        </div>

    )
}
export default Settings;