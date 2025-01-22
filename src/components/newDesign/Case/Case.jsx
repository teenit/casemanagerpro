import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";
import FilesUploader from "../../elements/Uploaders/FilesUploader";
import CasePhoto from "../../Cases/Case/Info/CasePhoto";
import CaseShortInfo from "./Caseshortinfo";
import setImg from "../../../img/icons/edit-outlined.svg";
import editImg from "../../../img/icons/edit-48-black.png";
import cameraImg from "../../../img/icons/camera-48-black.png";
import { checkRight } from "../../Functions/checkRight";
import Input from "../../elements/Inputs/Input";
import { serverAddres } from "../../Functions/serverAddres";
import axios from "axios";
import { giveGoodPhotosCase } from "../../Functions/giveGoodPhotos";
import LoadingPage from "../../Loading/LoadingPage";
import Plan from "./Plan";
import CaseProfilePhoto from "./CaseProfilePhoto";
import { loadCategories } from "../../../actions/categories";
import { useDispatch, useSelector } from "react-redux";
import GiveHelp from "./GiveHelp";
import Notes from "./Notes";
import CaseInfoBlock from "./CaseInfoBlock";
import GiveHelps from "./GiveHelps";
import DetailedInfo from "./DetailedInfo";
import GroupConnections from "../../Groups/Connect/GroupConnections";
import GalleryBlock from "../../blocks/GalleryBlock";
import CaseSettings from "./CaseSettings";
import SmallNotification from "../../elements/Notifications/SmallNotification";
import AccessCheck from "../../Functions/AccessCheck";
import { appConfig } from "../../../services/config";
import PersonalInfo from "./PersonalInfo";
import TextEditor from "../../elements/TextEditor/TextEditor";
import Files from "./Files";
import Fields from "./Fields";
import Histories from "./Histories";
import { Button, Switch } from "@mui/material";
import FieldsBlock from "./FieldsBlock";
import CaseLikePDF from "./CaseLikePDF";

const Case = () => {
    const downloadGallery = AccessCheck('yes_no', 'a_page_case_media_download')
    const [modeDisplay, setModeDisplay] = useState(localStorage.getItem('case_mode_display') == 1 ? true : false)
    const [page, setPage] = useState({
        loading: true,
        cases: false,
        message: ""
    })
    const post = {
        level: 8
    }
    const [cg, setCg] = useState(false)
    const user = useSelector(state=>state.auth);
    const generateViews = (views = {}) => {
        let obj = {}
        let viewConfig = appConfig.caseViewSettings;
        viewConfig.forEach(item => {
            obj[item.primary] = true;
            if (item?.options) {
                item.options.forEach(option => obj[option] = option)
            }
        })
        return { ...obj, ...views };
    }
    let params = useParams();
    const case_id = params.id;
    const [state, setState] = useState()
    const [editActive, setEditActive] = useState(null)
    const [openSetting, setOpenSetting] = useState(false)
    const [settingsAlert, setSettingsAlert] = useState(false)
    const getCaseInfo = () => {
        apiResponse({ case_id: case_id }, "case/get-case-by-id.php").then(res => {
            const user_id = res?.general?.user_id;
            const responsible_id = res?.general?.responsible_id;
            const user_id_active = user.user_id;
            setCg(user_id == user_id_active || responsible_id == user_id_active);
            const viewInfo = generateViews(res.userMeta?.case_view_info ? res.userMeta.case_view_info.value : {});
            setState({
                ...res, viewInfo: viewInfo
            });
           
            // getUserNameById(res.responsible_id)

        })
    }
    // const getUsersName = () => {
    //     apiResponse({}, "user/get-all-users-name.php").then(res => {
    //     })
    // }
    // const getUserNameById = () => {
    //     // apiResponse({user_id:1}, "user/get-user-name-by-id.php").then(res => {
    //     // })
    // }
    useEffect(() => {
        getCaseInfo();
       // getUsersName();
    }, [case_id])
    const settingsHandler = (value) => {
        setState({ ...state, viewInfo: value })
        localStorage.setItem("page_case_settings", JSON.stringify(value))
        setOpenSetting(false)
        setSettingsAlert(true)
    }
    const handleDataChange = (key, value) => {
        setState({ ...state, data: { ...state.data, [key]: value } })
        apiResponse({ [key]: value, case_id: case_id }, "case/update-case-data.php").then((data) => {
        })
    }
    const handleGeneralChange = (key, value) => {
        setState({ ...state, general: { ...state.general, [key]: value } })
        apiResponse({ [key]: value, case_id: case_id }, "case/update-case.php").then((data) => {
        })
    }
    return state && state.general ? (
        <div className="case__wrap">
            {!state?.general?.active && <div className="case-deactivate">
                <div className="">Кейс деактивовано, хочете активувати? <Button variant="contained" onClick={()=>handleGeneralChange("active", 1)}>ТАК</Button></div>
            </div>}
            {
                openSetting && !!state?.general?.active && <CaseSettings isActive={state.general.active} handleGeneralChange={handleGeneralChange} successHandler={getCaseInfo} views={state.viewInfoActive ? {} : state.viewInfo} />
            }
            <div></div>
            <div className="set__case__control">
                <Switch checked={modeDisplay} onChange={(e)=>{
                    setModeDisplay(e.target.checked);
                    localStorage.setItem("case_mode_display", e.target.checked ? 1 : 0)
                }}/>
                <img src={setImg} alt=""
                    onClick={() => { setOpenSetting(!openSetting) }} />
                {
                    (checkRight(post.level, "editOwnCase") || checkRight(post.level, "")) &&
                    <div>
                        <img className="editImg" src={editImg} alt="" editSomeonesCase
                            onClick={() => {
                                setEditActive(true)
                            }} />
                    </div>}
            </div>
            
            {modeDisplay ? <CaseLikePDF caseData={state}/> :
            <>
            <div className="flex">
                {(state.viewInfo.view_InfoBlock) && <CaseInfoBlock cg={cg} profileImg={state.meta?.profileImg?.link ? state.meta.profileImg.link.link : null} case_id={case_id} getCaseInfo={getCaseInfo} info={state} changeData={(key, value) => { handleDataChange(key, value) }} changeGeneral={(key, value) => { handleGeneralChange(key, value) }} />}
            </div>
            <div>
                {state?.fieldsMeta && <FieldsBlock cg={cg} getCaseInfo={getCaseInfo} works={state.fieldsMeta.works} contacts={state.fieldsMeta.contacts} another={state.fieldsMeta.another} case_id={case_id}/>}
                
            </div>
            {(state.viewInfo.view_GroupConnection) &&
                <GroupConnections cg={cg} case_id={case_id} type={"case"}/>
            }
            <div className="info__column">
                {(state.viewInfo.view_DetailedInfo) &&
                    <DetailedInfo cg={cg} info={state.data} case_id={case_id} changeData={(key, value) => { handleDataChange(key, value) }} />
                }
                {(state.viewInfo.view_Fields) &&
                    <Fields cg={cg} fields={state.fields} case_id={case_id} getCaseInfo={getCaseInfo} />
                }
                {(state.viewInfo.view_Plan) &&
                    <Plan cg={cg} plans={state.plans} case_id={case_id} getCaseInfo={getCaseInfo} />
                }
                {(state.viewInfo.view_Help) &&
                    <GiveHelps cg={cg} helps={state.helps} case_id={case_id} getCaseInfo={getCaseInfo} />
                }
                {(state.viewInfo.view_Notes) &&
                    <Notes cg={cg} case_id={case_id} getCaseInfo={getCaseInfo} notes={state.notes} />
                }
                {(state.viewInfo.view_Files) && <Files cg={cg} case_id={case_id} getCaseInfo={getCaseInfo} files={state.files} />}
                {(state.viewInfo.view_Histories) && <Histories cg={cg} data={state.meta.history_files} getCaseInfo={getCaseInfo} case_id={case_id} />}
            </div>

            {!!state?.meta?.files?.length && (state.viewInfo.view_Gallery) &&
                <GalleryBlock cg={cg} check={downloadGallery} data={state.meta.files} />}
            {state.viewInfo.view_FileUploader &&
                <div className="Uploader">
                    <p>Завантажити файл</p>
                    <div className="Uploader-content">
                        <FilesUploader successHandler={getCaseInfo} multiple={false} meta={{
                            key: ["case_files", "history_case_files"],
                            case_id: case_id,
                            type: "case"
                        }} />

                    </div>
                </div>
            }
            {settingsAlert && <SmallNotification isSuccess={true} text={"Показ елементів оновлено"} close={() => { setSettingsAlert(false) }} />}
            </>}
        </div>
    ) : (
        <>
            <div className="page__loading">
                <LoadingPage message={page.message} effload={page.effload} />
            </div>
        </>
    )
}

export default Case;
