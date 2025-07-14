import React, { useEffect, useState } from 'react'
import Icon from "../../elements/Icons/Icon"
import { LANG } from '../../../services/config';
import pptxIcon from "../../../img/resources/pptx.svg"
import docxIcon from "../../../img/resources/docx.svg"
import xlsxIcon from "../../../img/resources/xlsx.svg"
import codeIcon from "../../../img/resources/code.svg"
import imgIcon from "../../../img/resources/img.svg"
import pdfIcon from "../../../img/resources/pdf.svg"
import videoIcon from "../../../img/resources/mp4.svg"
import { NavLink } from 'react-router-dom';
import AccessCheck from '../../Functions/AccessCheck';
const Histories = ({ data, case_id, getCaseInfo , cg }) => {
    const [open, setOpen] = useState(false);
    const [histories, setHistories] = useState(null)
    useEffect(() => {
        const item = localStorage.getItem("page_case_histories");
        setOpen(item === "true");
        setHistories(data)

    }, []);
    const openHandler = () => {
        const newState = !open;
        localStorage.setItem("page_case_histories", newState);
        setOpen(newState);
    };
    const HistoryItem = ({ item }) => {
        const getIcon = (item) => {     
            switch (item.mime_type) {
                case "application/msword":
                case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
                    return docxIcon;
                case "application/vnd.ms-powerpoint":
                case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
                    return pptxIcon;
                case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
                    return xlsxIcon;
                case "application/pdf":
                    return pdfIcon;
                case "video/mp4":
                case "video/quicktime":
                    return videoIcon;
                case "image/png":
                case "image/jpeg":
                case "image/jpg":
                    return item.link;
    
                default:
                    return codeIcon;
                    break;
            }
        }
    
        const cutTitle = (str) => {
            return str.length > 25 ? str.slice(0, 25) + "..." : str;
        }
    
        return (
            <NavLink to={item.link} target='_blank'>
                <div className='Histories-HistoryItem'>
                    <img src={getIcon(item)} alt="icon" />
                    <div>{cutTitle(item?.title)}</div>
                </div>
            </NavLink>
        );
    };

    const access = {
        case_media_edit: AccessCheck("view_edit", "a_page_case_media", "edit"),
    }

    
    return (
        <>
       {histories && histories.length > 0 && <div className="Histories">
            <div className="Histories-title">
                <div>Історії</div>
                <Icon icon={"arrow_down"} addClass={"fs35"} onClick={openHandler} />
            </div>
            <div className="Histories-content">
                {open && (
                    histories && histories.length > 0 ? histories.map((item, index) => {
                        return <HistoryItem key={index} item={item} />
                    })
                        : <div>{LANG.no_records}</div>)}
            </div>
        </div>}
        </>
    )
}

export default Histories