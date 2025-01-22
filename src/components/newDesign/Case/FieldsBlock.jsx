import React, { useState } from "react";
import Input from "../../elements/Inputs/Input";
import { apiResponse } from "../../Functions/get_apiObj";
import InputBlock from "../../elements/Inputs/InputBlock";
import { Switch } from "@mui/material";
import AccessCheck from "../../Functions/AccessCheck";

const FieldsBlockGroup = ({options, case_id, title="", getCaseInfo, right = null}) => {

    const saveField = (id, value) => {
        apiResponse({field_id: id, value: value, case_id: case_id}, "case/update-fields-meta.php").then((res)=>{
            if(res.status) getCaseInfo();
        })
    }

    return(
        <div className="FieldsBlockGroup">
            <div className="FieldsBlockGroup-inner">
                <div className="FieldsBlockGroup-inner-title">{title}</div>
                <div className="FieldsBlockGroup-inner-options">
                {options.map((field)=>{

                    return(<>
                        {(field.type === "date" || 
                        field.type === "string" ||
                        field.type === "int" || 
                        field.type === "email" ||
                        field.type === "text" ||
                        field.type === "phone") && <div key={field.id}>
                            <InputBlock
                                inputType={(field.type === "string" || field.type === "int" || field.type === "phone") ? "text" : field.type}
                                saveHandler={(value)=>{
                                    saveField(field.id, value);
                                }}
                                value={field.value}
                                label={field.value}
                                title={field.name}
                                icon={field.icon}
                                textarea={field.type === "text"}
                                // titleDefault={field.name}
                                showLable={true}
                                disabled={!right}
                            />
                        </div>
                        }
                        {field.type === "boolean" && <div>
                            <b>{field.name}</b>
                            <Switch disabled={!right} defaultChecked={field.value == 1} onChange={(e) => {
                                if (e.target.checked) {
                                    saveField(field.id, 1);
                                } else {
                                    saveField(field.id, 0);
                                }
                            }} />
                            </div>}
                    </>)
                })}
                </div>
            </div>
        </div>
    )
    
}

const FieldsBlock = ({works, contacts, another, case_id, getCaseInfo, cg = false}) => {
    const access = {
        contact_info_edit: AccessCheck("view_edit", "a_page_case_contact_info", "edit") && cg,
        contact_info_view: AccessCheck("view_edit", "a_page_case_contact_info", "view"),
        another_info_edit: AccessCheck("view_edit", "a_page_case_info", "edit") && cg,
        another_info_view: AccessCheck("view_edit", "a_page_case_info", "view"),
        simple_info_edit: AccessCheck("view_edit", "a_page_case_simple_info", "edit") && cg,
        simple_info_view: AccessCheck("view_edit", "a_page_case_simple_info", "view"),
    }
    return(<div className="FieldsBlock">
        {works.length > 0 && access.simple_info_view && <FieldsBlockGroup right={access.simple_info_edit} getCaseInfo={getCaseInfo} title="Робочі дані" options={works} case_id={case_id}/>}
        {contacts.length > 0 && access.contact_info_view && <FieldsBlockGroup right={access.contact_info_edit} getCaseInfo={getCaseInfo} title="Контактні дані" options={contacts} case_id={case_id}/>}
        {another.length > 0 && access.another_info_view && <FieldsBlockGroup right={access.another_info_edit} getCaseInfo={getCaseInfo} title="Дані поза групою" options={another} case_id={case_id}/>}
    </div>)
}

export default FieldsBlock;