import React, { useState } from "react";
import Modal from "./Modal";
import { LANG } from "../../services/config";
import { Button, Checkbox, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import Hint from "../elements/Hints/Hint";
import CheckboxListAccess from "../elements/CheckBoxes/CheckboxListAccess";
import { apiResponse } from "../Functions/get_apiObj";
import Input from "../elements/Inputs/Input";
import LoadingPage from "../Loading/LoadingPage";
import Loadpic from "../Loading/Interactive/Loadpic";
import SmallNotification from "../elements/Notifications/SmallNotification";

const ExportPDFCasesModal = (props) => {
    const {close, list} = props;
    const [selected, setSelected] = useState([])
    const [settings, setSettings] = useState({
        enabledWaterMarkImage: false,
        enabledWaterMarkText: false,
        setPasswordPdf: false,
        setPasswordArchive: false,
        passwordToPdf: "",
        passwordToArchive: ""
    })
    const [error, setError] = useState({
        status: false,
        message: ""
    })
    const [loading, setLoading] = useState(false);
    const exportPdf = () => {
        if (selected.length == 0) return setError({status: true, message: LANG.exportPDFcasesModal.no_file_selected});
        setLoading(true);
        apiResponse({case_ids: selected, ...settings},"mpdf/mas-printcard.php" ).then((res)=>{
            if (res.status) {
                const a = document.createElement("a");
                a.href = res.link;
                a.download = res.link.split("/").pop(); // Визначаємо ім'я файлу
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                setLoading(false);
                close();
            } else {
                setError({message: res.message, status: true});
                setLoading(false)
            }

        })
    }

    const updateSettings = (key, value) => {
        setSettings({...settings, [key]: value})
    }

    return (
        <Modal
            header={LANG.exportPDFcasesModal.title}
            closeHandler={close}
            footer={!loading && <>
                <Button variant="contained" color="error" onClick={close}>{LANG.GLOBAL.cancel}</Button>
                <Button variant="contained" onClick={exportPdf}>{LANG.GLOBAL.save}</Button>
            </>}
        >

            
            <div className="ExportPDFCasesModal">
                {loading && <LoadingPage addClass="ExportPDFCasesModal-loading h-auto" effload={true}/>}
                <div className="ExportPDFCasesModal-settings">
                    <div className="ExportPDFCasesModal-settings-line">{LANG.exportPDFcasesModal.settings}</div>
                    <div className="ExportPDFCasesModal-settings-line">
                        <label>
                            <Checkbox size="small" value={settings.setPasswordPdf} onChange={(e)=>updateSettings("setPasswordPdf", e.target.checked)}/>
                            {!settings.setPasswordPdf ? <span>{LANG.exportPDFcasesModal.set_password}</span> : <Input disabled={!settings.setPasswordPdf} size="small" addClass="w100"  label={LANG.exportPDFcasesModal.pdf_pass} value={settings.passwordToPdf} onChange={(e)=>updateSettings("passwordToPdf", e.target.value)}/>}
                        </label>
                        
                    </div>
                    <div className="ExportPDFCasesModal-settings-line">
                        <label>
                            <Checkbox size="small" value={settings.setPasswordArchive} onChange={(e)=>updateSettings("setPasswordArchive", e.target.checked)}/>
                            {!settings.setPasswordArchive ? <span>{LANG.exportPDFcasesModal.set_archive_pass}</span> : <Input disabled={!settings.setPasswordArchive} size="small" addClass="w100" label={LANG.exportPDFcasesModal.archive_pass} value={settings.passwordToArchive} onChange={(e)=>updateSettings("passwordToArchive", e.target.value)}/>}
                        </label>
                    </div>
                    <div className="ExportPDFCasesModal-settings-line">
                        <label>
                            <Checkbox size="small" value={settings.enabledWaterMarkImage} onChange={(e)=>updateSettings("enabledWaterMarkImage", e.target.checked)}/>
                            <span>{LANG.exportPDFcasesModal.watermark_image}</span>
                        </label>
                    </div>
                    <div className="ExportPDFCasesModal-settings-line">
                        <label>
                            <Checkbox size="small" value={settings.enabledWaterMarkText} onChange={(e)=>updateSettings("enabledWaterMarkText", e.target.checked)}/>
                            <span>{LANG.exportPDFcasesModal.watermark_text}</span>
                        </label>
                    </div>
                </div>
            
            <CheckboxListAccess checkedAll={true} onCheckedAll={(mas)=>setSelected(mas)} checkedMas={selected} allMas={()=>{return list}} onChange={(value)=>{
                let cases = [];
                 if (selected.includes(value)) {
                    cases = selected.filter(element => element !== value);
                  } else {
                    cases = [...selected, value];
                  }
                  setSelected([...cases])
            }}/>
            </div>
            {error.status && <SmallNotification isSuccess={false} text={error.message} close={() => { setError({status: false}) }} />}
            {/* <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {list.map((item) => {
                const labelId = `checkbox-list-label-${item.id + 1}`;
                return (
                <ListItem
                    key={item.id + item.name}
                    secondaryAction={
                    <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                    </IconButton>
                    }
                    disablePadding
                >
                    <ListItemButton role={undefined} onClick={handleToggle(item)} dense>
                    <ListItemIcon>
                        <Checkbox
                        edge="start"
                        checked={checkChecked(item.id)}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                        />
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={item.name} />
                    {item.description && <Hint text={item.description} placement='left'/>}
                    </ListItemButton>
                </ListItem>
                );
            })}
            </List> */}

        </Modal>
    )
}

export default ExportPDFCasesModal