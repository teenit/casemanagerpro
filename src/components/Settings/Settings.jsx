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
import { LANG } from "../../services/LANG";
import { apiResponse } from "../Functions/get_apiObj";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Icon from "../elements/Icons/Icon";

const MODE = 'settings_page_';
const Settings = ()=>{
   
    const [page, setPage] = useState({loading:true,effload:false,message:""})
    const [categories,setCategories] = useState([]);
    const [categoriesCont,setCategoriesCont] = useState([]);


    const [expanded, setExpanded] = useState({
        users: localStorage.getItem(MODE + 'users') ? !!+localStorage.getItem(MODE + 'users') : false,
        categories: localStorage.getItem(MODE + 'categories') ? !!+localStorage.getItem(MODE + 'categories') : false,
        events: localStorage.getItem(MODE + 'events') ? !!+localStorage.getItem(MODE + 'events') : false,
        config: localStorage.getItem(MODE + 'config') ? !!+localStorage.getItem(MODE + 'config') : false,
    });

    const [expandedConfig, setExpandedConfig] = useState(localStorage.getItem(MODE + 'active_config'));

    const changeActiveConfig = (key) => {
        localStorage.setItem(MODE + 'active_config', key);
        setExpanded(key)
    }

    const expandedChange = (type) => {
        localStorage.setItem(MODE + type, !expanded[type] ? 1 : 0);
        setExpanded({...expanded, [type]: !expanded[type]})
    }


    useEffect(()=>{
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres('user/page-setting.php'),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            if(data.data?.message){
                setPage({
                        effload:false,
                        message: data.data.message,
                        loading:true
                    })
            }else{
                    setPage({loading:false})
            }
        })
        .catch((error)=>console.log(error)) 
    },[])
   
    return page.loading ?(
        <div className="page__loading">
            <LoadingPage message={page.message} effload = {page.effload}/>
        </div>
    ):(
        <div className="page">
             <div className="page__title">
                <h1>Налаштування</h1>
            </div>
            <div className="SettingsPage-accordion">
            <Accordion  expanded={expanded.users} id="expanded_users" onChange={()=>{
                expandedChange('users')
            }}>
                <AccordionSummary expandIcon={<Icon icon={'arrow_down'}/>}>
                    Користувачі
                </AccordionSummary>
                <AccordionDetails>
                    <SetUser categories = {categories} categoriesCont = {categoriesCont}/>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded.categories} id="expanded_categories" onChange={()=>{
                expandedChange('categories')
            }}>
                <AccordionSummary expandIcon={<Icon icon={'arrow_down'}/>}>
                    Категорії
                </AccordionSummary>
                <AccordionDetails>  
                    <SettingsCategory 
                        title={LANG.SETTINGS.title_category_case} 
                        categoryColor = "#1976d2" 
                        categoryKey = "case"
                    />
                    <SettingsCategory 
                        title={LANG.SETTINGS.title_category_case_helps} 
                        categoryColor = "#1976d2" 
                        categoryKey = "case_helps"
                    />
                    <SettingsCategory 
                        title={LANG.SETTINGS.title_category_groups} 
                        categoryColor = "#1976d2" 
                        categoryKey = "groups"
                    />
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded.events} id="expanded_events" onChange={()=>{
                expandedChange('events')
            }}>
                <AccordionSummary expandIcon={<Icon icon={'arrow_down'}/>}>
                    Події
                </AccordionSummary>
                <AccordionDetails>
                    <SetEvent />
                </AccordionDetails>
            </Accordion>
            <Accordion  expanded={expanded.config} id="expanded_config" onChange={()=>{
                expandedChange('config')
            }}>
                <AccordionSummary expandIcon={<Icon icon={'arrow_down'}/>}>
                    Конфігурації програми
                </AccordionSummary>
                <AccordionDetails>
               
                </AccordionDetails>
            </Accordion>
            </div>
        
        </div>
       
    )
}
export default Settings;