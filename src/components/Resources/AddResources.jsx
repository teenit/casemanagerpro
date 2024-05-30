import axios from "axios";
import React from "react";
import { useState } from "react";
import { serverAddres } from "../Functions/serverAddres";
import FilesUploader from "../elements/Uploaders/FilesUploader"
import s from './Resources.module.css';
import Input from "../elements/Inputs/Input"

const AddResources = ()=>{
 
    const [meta, setMeta] = useState({
        title:"",
        description:"",
        file:null
    })
    const handleMetaChange = (key,value)=>{
        setMeta({...meta,[key]:value})
    }

    return(
                <div className="AddResources">
                    <div className="AddResources-split">
                        <Input type="text" 
                                label="Назва Ресурсу"
                                value={meta.title}
                                onChange={(e)=>{handleMetaChange("title",e.target.value)}}/>
                        <Input type="text" 
                                label="Опис Ресурсу"
                                value={meta.description}
                                onChange={(e)=>{handleMetaChange("description",e.target.value)}}/>
                    </div>
                    
                    <FilesUploader 
                        multiple={true} 
                        type="resource"
                        successHandler={(res)=>{console.log(res)}} 
                        meta={{
                            key:"files",
                            title: meta.title,
                            description: meta.description
                        }}/>
                </div>
    )
    
}

export default AddResources;