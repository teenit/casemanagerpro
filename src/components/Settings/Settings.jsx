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
const Settings = ()=>{
   
    const [page, setPage] = useState({loading:true,effload:false,message:""})
    const [categories,setCategories] = useState([]);
    const [categoriesCont,setCategoriesCont] = useState([]);
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
            <div className="settings__page">
            <SetUser categories = {categories} categoriesCont = {categoriesCont}/>
            <div>
                <SettingsCategory 
                    title={LANG.SETTINGS.title_category_case} 
                    categoryColor = "#1976d2" 
                    categoryKey = "case"
                />
               
            </div>

            <div>
                <SettingsCategory 
                    title={LANG.SETTINGS.title_category_case_helps} 
                    categoryColor = "#1976d2" 
                    categoryKey = "case_helps"
                />
             
            </div>

            {/* <SetCategories cats = {(arg)=>{
                setCategories(arg)
            }}/>
            <SetContactCategory cats = {(arg)=>{
                setCategoriesCont(arg)
            }} /> */}
            <SetEvent />
        </div>
        
        </div>
       
    )
}
export default Settings;