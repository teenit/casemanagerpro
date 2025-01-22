import { Button, TextField, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from "react";
import {LANG} from "../../../services/LANG";
import { changeAps } from "../../Functions/translateString";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import InputColor from "../../elements/Inputs/InputColor";
import { apiResponse } from "../../Functions/get_apiObj";
import { MuiColorInput } from "mui-color-input";
import ListCategories from "./ListCategories";
import Modal from "../../Modals/Modal";
import Icon from "../../elements/Icons/Icon";
import AccessCheck from "../../Functions/AccessCheck";

const SettingsCategory = ({title = "",categoryName = "", categoryDescription = "", categoryColor = "", categoryKey = null, rights = {}}) => {
    const [state, setState] = useState({
        categoryName:categoryName,
        categoryDescription:categoryDescription,
        categoryColor:categoryColor,
        categoryKey:categoryKey,
    })
    const [addModal, setAddModal] = useState(false)
    const [showList, setShowList] = useState(false)
    const [categories, setCategories]  = useState([]);
    const checkAddRight = AccessCheck("yes_no", rights.add);
    const checkRemoveRight = AccessCheck("yes_no", rights.remove);
    const getCategories = (key) => {
        apiResponse({categoryKey:key},"manage/get-categories.php").then((data)=>{
            setCategories([...data.data])
        })
    }
    useEffect(()=>{
        getCategories(state.categoryKey);
    },[])
    const changeHandler = (val, key)=>{
        let value = changeAps(val);
        setState({...state, [key]:value})
    }

    const clickHandler = () => {
        apiResponse({...state}, "manage/add-categories.php").then((data)=>{
            getCategories(state.categoryKey);
            setState({
                categoryName:categoryName,
                categoryDescription:categoryDescription,
                categoryColor:categoryColor,
                categoryKey:categoryKey, 
            })
            setAddModal(false)
        })
    }

    return (
        <div className="SettingsCategory">
            <div className="SettingsCategory--title">
                <div onClick={()=>setShowList(!showList)} className="flex SettingsCategory--title-withicon">
                    <div className={showList ? "active" : ""}><Icon addClass={'fs16'} icon={'arrow_down'}/></div>
                    <div>{title} ({categories.length})</div>
                </div>
                
                {checkAddRight && <div className="add" onClick={()=>setAddModal(true)}><Icon icon={'add'}/></div>}
            </div>
            {
                showList && <ListCategories categories={categories}/>
            }
            
            {
                addModal &&
                <Modal 
                    header={title}
                    closeHandler={()=>setAddModal(false)}
                    footer={<div className="SettingsCategory--form-button">
                <Button disabled = {state.categoryName == "" && true} variant="contained" onClick={clickHandler}>Зберегти</Button>
            </div>}
                >
                {
                    state.categoryKey && (
                        <div className="SettingsCategory--form">
                            <div className="SettingsCategory--form-inputs">
                                <Input
                                    label={LANG.SETTINGS.title_category}
                                    value={state.categoryName}
                                    onChange={(e)=>changeHandler(e.target.value, "categoryName")}
                                />
                                <MuiColorInput className='w50' format="hex" value={state.categoryColor} onChange={(e)=>{ changeHandler(e, 'categoryColor')}} />
                            </div>
                            <div className="SettingsCategory--form-textarea">
        
                                <Textarea
                                    label={LANG.SETTINGS.description_category}
                                    value={state.categoryDescription}
                                    onChange={(e)=>changeHandler(e.target.value, "categoryDescription")}
                                    minRows={3}
                                />
                            </div>
                            
                        </div>
                        )
                }
                </Modal>
            }
        </div>
    )
}

export default SettingsCategory;