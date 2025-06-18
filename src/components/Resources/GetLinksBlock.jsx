import React, { useState } from "react";
import { LANG } from "../../services/config";
import Icon from "../elements/Icons/Icon";
import AccessCheck from "../Functions/AccessCheck";
import EmptyData from "../EmptyData/EmptyData";

const GetLinksBlock = ({ links = [], confirmDelete, showForm }) => {
    const [state, setState] = useState({
        showList: false
    });
    const canRemove = AccessCheck('yes_no', 'a_page_resources_remove');
    const canUpload = AccessCheck('yes_no', "a_page_resources_upload")
    return (
        <div className="GetLinksBlock">
            <div className="GetLinksBlock-header">
                <div className="GetLinksBlock-header-title" onClick={() => setState({ ...state, showList: !state.showList })}>
                    <span>{LANG.resources.link_title}</span>
                    <Icon icon={'arrow_down'} />
                </div>
            </div>
            {
                state.showList &&
                <div className="GetLinksBlock-list">
                    {
                        links.map((item) => {
                            return (
                                <div key={item.resource_id} className="GetLinksBlock-list-item">
                                    <div className="GetLinksBlock-list-item-title">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                        {canRemove && <Icon icon={'delete'} onClick={() => confirmDelete(item)} addClass="delete-icon"  />}
                                    </div>
                                    <div className="GetLinksBlock-list-item-description">{item.description}</div>
                                </div>
                            );
                        })
                    }
                    {links.length === 0 && <EmptyData access={canUpload} title={LANG.resources.no_links} buttonText={LANG.resources.add_first_link} click={()=>{showForm("link")}}/>}
                </div>
            }

        </div>
    );
}

export default GetLinksBlock;
