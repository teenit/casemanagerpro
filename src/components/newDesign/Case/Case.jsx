import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";
import FilesUploader from "../../elements/Uploaders/FilesUploader";
import CasePhoto from "../../Cases/Case/Info/CasePhoto";
import CaseShortInfo from "./Caseshortinfo";
import setImg from "../../../img/icons/settings-50-black.png";
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

const Case = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories);
    const loading = useSelector(state => state.loading);
    const [page, setPage] = useState({
        loading: true,
        cases: false,
        message: ""
    })
    const post = {
        level: 8
    }
    let params = useParams();
    const case_id = params.id;
    const [state, setState] = useState()
    const [editActive, setEditActive] = useState(null)
    const [openSetting, setOpenSetting] = useState(false)
    const [settingsAlert, setSettingsAlert] = useState(false)
    const getCaseInfo = () => {
        apiResponse({ case_id: case_id }, "case/get-case-by-id.php").then(res => {
            const viewInfo = JSON.parse(localStorage.getItem("page_case_settings"))
            setState({ ...res, viewInfoActive: res.viewInfo ? false : true, viewInfo: viewInfo });
            getUserNameById(res.responsible_id)
            console.log(state);
        })
    }
    const getUsersName = () => {
        apiResponse({}, "user/get-all-users-name.php").then(res => {
        })
    }
    const getUserNameById = () => {
        // apiResponse({user_id:1}, "user/get-user-name-by-id.php").then(res => {
        // })
    }
    useEffect(() => {
        getCaseInfo();
        getUsersName();
    }, [case_id])
    const settingsHandler = (value) => {
        setState({ ...state, viewInfo: value })
        localStorage.setItem("page_case_settings", JSON.stringify(state))
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
            {
                openSetting && <CaseSettings successHandler={(value) => { settingsHandler(value) }} views={state.viewInfoActive ? {} : state.viewInfo} />
            }
            <div className="set__case__ico">
                <img className="setImg" src={setImg} alt=""
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


            <div className="case__contact__info">
                {(state.viewInfoActive || state.viewInfo?.view_ProfilePhoto) &&
                    <CaseProfilePhoto profileImg={state.meta?.profileImg?.link ? state.meta.profileImg.link.link : null} getCaseInfo={getCaseInfo} case_id={case_id} />
                }
                <div>

                    <CaseInfoBlock case_id={case_id} getCaseInfo={getCaseInfo} info={state} changeData={(key, value) => { handleDataChange(key, value) }} changeGeneral={(key, value) => { handleGeneralChange(key, value) }} />
                </div>
            </div>
            {(state.viewInfoActive || state.viewInfo?.view_GroupConnection) &&
                <GroupConnections case_id={case_id} type={"case"} />
            }
            <div className="container__grid__two">
                {(state.viewInfoActive || state.viewInfo?.view_DetailedInfo) &&
                    <DetailedInfo info={state.data} changeData={(key, value) => { handleDataChange(key, value) }} />
                }
                {(state.viewInfoActive || state.viewInfo?.view_Plan) &&
                    <Plan plans={state.plans} case_id={case_id} getCaseInfo={getCaseInfo} />
                }
            </div>
            <div className="container__grid__two">
                {(state.viewInfoActive || state.viewInfo?.view_Help) &&
                    <GiveHelps helps={state.helps} case_id={case_id} getCaseInfo={getCaseInfo} />
                }
                {(state.viewInfoActive || state.viewInfo?.view_Notes) &&
                    <Notes case_id={case_id} getCaseInfo={getCaseInfo} notes={state.notes} />
                }
            </div>

            {!!state?.meta?.files?.length && (state.viewInfoActive || state.viewInfo?.view_Gallery) && 
            <GalleryBlock check={()=>{AccessCheck('yes_no', 'a_page_case_media_download')}} data={state.meta.files} />}
            {state.viewInfoActive || state.viewInfo?.view_FileUploader &&
                <div className="uploader_wrap">
                    <p>Завантажити файл</p>
                    <FilesUploader successHandler={getCaseInfo} multiple={false} meta={{
                        key: "case_files",
                        case_id: case_id,
                        type: "case"
                    }} />
                </div>
            }
            {settingsAlert && <SmallNotification isSuccess={true} text={"Показ елементів оновлено"} close={() => { setSettingsAlert(false) }} />}

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
