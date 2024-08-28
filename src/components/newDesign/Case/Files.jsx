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
import FileSearch from "./FileSearch";
import Hint from "../../elements/Hints/Hint";

const Files = ({ case_id, getCaseInfo, files }) => {
    const [filteredFiles, setFilteredFiles] = useState(null)
    const [rows, setRows] = useState(1);
    const [columns, setColumns] = useState(5);
    const [width, setWidth] = useState(window.innerWidth);
    const [open, setOpen] = useState(false);
    const [alert, setAlert] = useState({ success: false, error: false, message: "" });
    const [modal, setModal] = useState(false);
    const [tags, setTags] = useState([]);
    const [data, setData] = useState({
        title: "",
        description: "",
        tag: ""
    });

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if (width > 800) {
            setColumns(5);
        } else if (width <= 800 && width > 550) {
            setColumns(3);
        } else {
            setColumns(2);
        }
    }, [width]);

    useEffect(() => {
        setFilteredFiles(files)
        setRows(Math.ceil(files.length / columns));
        const item = localStorage.getItem("page_case_files");
        setOpen(item === "true");
    }, [case_id, columns, files]);

    const filterFiles = (result) => {
        const fileIds = result.map(item => item.id)
        const filter = files.filter(item => fileIds.includes(item.id))
        setFilteredFiles(filter)
        console.log(filter);

    }
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
        if (data.title.length < 1 || data.title.length > 100) {
            return alertHandler("error", LANG.caseFiles.alerts.invalidName);
        }
        console.log(tags.join(','));
        
        // apiResponse({ title: data.title, description: data.description, tag: tags.join(','), client_id: case_id, type: "file" }, 
        // "manage/files/create.php").then((res) => {
        //     alertHandler("success", LANG.caseFiles.alerts.success);
        //     getCaseInfo();
        //     setModal(false);
        //     setRows(Math.ceil(files.length / columns));
        // }).catch((error) => {
        //     alertHandler("error", LANG.caseFiles.alerts.error);
        // });
    };

    const cutTitle = (str) => {
        return str.length > 20 ? str.slice(0, 20) + "..." : str;
    };

    const addTag = () => {
        const newTags = data.tag.includes(',') ? data.tag.split(',') : [data.tag.trim()];
        const filteredTags = newTags.map(item=>item.trim()).filter(item=>item.length>0&&item.length<50)
        if (data.tag.trim() !== "" && filteredTags.length>0) {
            setTags([...tags, ...filteredTags]);
            dataHandler("tag", "");
        }
    };


    const removeTag = (name) => {
        setTags(tags.filter(item => item !== name));
    };

    const File = ({ item }) => {
        const [hover, setHover] = useState(false);
        return (
            <NavLink to={`/file/${item.id}`}>
                <div className="Files-file" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                    <div className="Files-file-icon"></div>
                    {hover ? item.title : cutTitle(item.title)}
                </div>
            </NavLink>
        );
    };

    const Tag = ({ name }) => {
        return (
            <div className="Files-tag">
                <Icon icon={"close"} addClass={"close-icon"} onClick={() => removeTag(name)} />
                <span>{name}</span>
            </div>
        );
    };

    return (
        <div className="Files">
            <div className="Files-title">
                <div className="Files-title-panel" onClick={openHandler}>
                    <div>{LANG.caseFiles.title}</div>
                    <Icon icon="arrow_down" addClass="fs35 arrow" />
                </div>
                <FileSearch files={files} filterFiles={(res) => { filterFiles(res) }} />
                <Icon icon="add" onClick={() => setModal(true)} />
            </div>
            {open && (
                <div className="Files-viewer" style={{ gridTemplateRows: `repeat(${rows}, 1fr)`, gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                    {filteredFiles && filteredFiles.length > 0 ?
                        filteredFiles.map((item, index) => (
                            <File key={index} item={item} />
                        )) :
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
                            <Button onClick={saveHandler} variant="contained">{LANG.save}</Button>
                        </div>
                    }>
                    <div className="Files-modal">
                        <Input label={LANG.GLOBAL.title} value={data.title} onChange={(e) => dataHandler("title", e.target.value)} />
                        <Textarea label={LANG.GLOBAL.description} value={data.description} onChange={(e) => dataHandler("description", e.target.value)} />
                        <div className="Files-modal-caption">
                            <span>{LANG.GLOBAL.tags}</span>
                            <Hint text={LANG.hints.tag} placement="right" />
                        </div>
                        {tags.length > 0 && <div className="Files-tags">
                            {tags.map((item, index) => (
                                <Tag key={index} name={item} />
                            ))}
                        </div>}
                        <Input value={data.tag} onChange={(e) => dataHandler("tag", e.target.value)} />
                        <Button variant="contained" onClick={addTag}>Додати тег</Button>
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
