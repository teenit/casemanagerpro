import { Button, TextField, TextareaAutosize } from "@mui/material";
import React, { useState } from "react";
import {LANG} from "../../../services/LANG";
import { changeAps } from "../../Functions/translateString";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import InputColor from "../../elements/Inputs/InputColor";
import { apiResponse } from "../../Functions/get_apiObj";
import { MuiColorInput } from "mui-color-input";

const SettingsCategory = ({title = "",categoryName = "", categoryDescription = "", categoryColor = "", categoryKey = null}) => {
    const [state, setState] = useState({
        categoryName:categoryName,
        categoryDescription:categoryDescription,
        categoryColor:categoryColor,
        categoryKey:categoryKey,
    })
    const changeHandler = (val, key)=>{
        let value = changeAps(val);
        setState({...state, [key]:value})
    }
    const clickHandler = () => {
      //  return console.log(state)
        apiResponse({...state}, "manage/add-categories.php").then((data)=>{
            console.log(data)
        })
    }

    return (
        <div className="SettingsCategory">
            <h2>{title}</h2>
            {
                state.categoryKey && (
                <div className="SettingsCategory--form">
                    <div className="SettingsCategory--form-inputs">
                        <Input
                            label={LANG.SETTINGS.title_category}
                            value={state.categoryName}
                            onChange={(e)=>changeHandler(e.target.value, "categoryName")}
                        />
                        <MuiColorInput className='w50' format="hex" value={state.categoryColor} onChange={(e)=>{console.log(e); changeHandler(e, 'categoryColor')}} />
                    </div>
                    <div className="SettingsCategory--form-textarea">

                        <Textarea
                            label={LANG.SETTINGS.description_category}
                            value={state.categoryDescription}
                            onChange={(e)=>changeHandler(e.target.value, "categoryDescription")}
                            minRows={3}
                        />
                    </div>
                    <div className="SettingsCategory--form-button">
                        <Button disabled = {state.categoryName == "" && true} variant="contained" onClick={clickHandler}>Зберегти</Button>
                    </div>
                </div>
                )
            }
            
        </div>
    )
}

export default SettingsCategory;