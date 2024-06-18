import React, { useState } from "react";
import { LANG } from "../../services/config";
import Icon from "../elements/Icons/Icon";

const GetLinksBlock = ({links = [], confirmDelete}) => {
    const [state, setState] = useState({
        showList: false
    })
    
    return (
        <div className="GetLinksBlock">
            <div className="GetLinksBlock-header">
                <div className="GetLinksBlock-header-title" onClick={()=>setState({...state, showList: !state.showList})}>
                    <span>{LANG.resources.link_title}</span>
                    <Icon icon={'arrow_down'}/>
                </div>
            </div>
            {
                state.showList &&
                <div className="GetLinksBlock-list">
                    {
                        links.map((item)=>{
                            return(
                                <div key={item.resource_id} className="GetLinksBlock-list-item">
                                    <div className="GetLinksBlock-list-item-title">
                                        <a href={item.link} target="_blank">{item.title}</a>
                                        <span className="delete-icon" onClick={()=>confirmDelete(item)}><Icon icon={'delete'}/></span>
                                    </div>
                                    <div className="GetLinksBlock-list-item-description">{item.description}</div>
                                </div>
                            )
                        })
                    }
                </div>
            }
         
        </div>
    )
}

export default GetLinksBlock;