import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import Icon from "../../elements/Icons/Icon";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import Modal from "../../Modals/Modal";
import { LANG } from "../../../services/config";
import { apiResponse } from "../../Functions/get_apiObj";
import FileModal from "../../Modals/FileModal";
import parse from 'html-react-parser';
const Files = ({ case_id, getCaseInfo, files }) => {
    console.log(files);
    const [rows,setRows] = useState(1)
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ success: false, error: false, message: "" });
    const [modal, setModal] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: ""
    });

    useEffect(() => {
        setRows(Math.ceil(files.length/10))
        const item = localStorage.getItem("page_case_files");
        setOpen(item === "true");
    }, [case_id]);

    const dataHandler = (key, value) => {
        setData({ ...data, [key]: value });
    };

    const openHandler = () => {
        const newState = !open;
        localStorage.setItem("page_case_files", newState);
        setOpen(newState);
    };

    const alertHandler = (key, message = "") => {
        setAlert({ ...alert, [key]: !alert[key], message });
    };

    const saveHandler = () => {
        if (data.title.length < 1 || data.title.length > 150) {
            return alertHandler("error", LANG.caseFiles.alerts.invalidName);
        }
        apiResponse({ ...data, client_id:case_id }, "manage/files/create.php").then((res) => {
            alertHandler("success", LANG.caseFiles.alerts.success);
            console.log(res);
            getCaseInfo();
            setModal(false);
            setRows(Math.ceil(files.length/10))
        }).catch((error) => {
            alertHandler("error", LANG.caseFiles.alerts.error);
        });
    };

    const cutTitle = (str) => {
        return str.length > 20 ? str.slice(0, 20) + "..." : str;
    };

    const File = ({ item }) => {
        const [hover, setHover] = useState(false);
        const [modal,setModal] = useState(false)
        return (
            <div className="Files-file" onMouseEnter={() => { setHover(true) }} onMouseLeave={() => { setHover(false) }}>
                <div className="Files-file-icon" onClick={()=>{setModal(true)}}></div>
                <NavLink to={`/file/${item.id}`}>{hover ? item.title : cutTitle(item.title)}</NavLink>
                {/* {modal && <FileModal value={parse(item.value)} title={item.title} close={()=>{setModal(false)}}/>} */}
            </div>
        );
    };

    return (
        <div className="Files">
            <div className="Files-title">
                <div className="Files-title-panel" onClick={openHandler}>
                    <div>{LANG.caseFiles.title}</div>
                    <Icon icon="arrow_down" addClass="fs35" />
                </div>
                <Icon icon="add" onClick={() => setModal(true)} />
            </div>
            {open && (
                <div className="Files-viewer" style={{gridTemplateRows:`repeat(${rows},1fr);`}}>
                    {files ?
                        files.map((item, index) => {
                            return <File key={index} item={item} />
                        }) :
                        <p>{LANG.no_records}</p>
                    }
                </div>
            )}

            {modal && (
                <Modal
                    header={LANG.caseFiles.add}
                    closeHandler={() => setModal(false)}
                    footer={
                        <div className="Modal--footer">
                            <Button onClick={() => setModal(false)} color="error" variant="contained">{LANG.cancel}</Button>
                            <Button onClick={() => saveHandler()} variant="contained">{LANG.save}</Button>
                        </div>}>
                    <div className="Files-modal">
                        <Input label={LANG.GLOBAL.title} value={data.title} onChange={(e) => { dataHandler("title", e.target.value) }} />
                        <Textarea label={LANG.GLOBAL.description} value={data.description} onChange={(e) => { dataHandler("description", e.target.value) }} />
                    </div>
                </Modal>
            )}
            {alert.error && alert.message && (
                <SmallNotification isSuccess={false} text={alert.message} close={() => alertHandler("error")} />
            )}
            {alert.success && alert.message && (
                <SmallNotification isSuccess={true} text={alert.message} close={() => alertHandler("success")} />
            )}
        </div>
    );
};

export default Files;
