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
    const [state, setState] = useState(null)
    const [editActive, setEditActive] = useState(null)
    const [openSetting, setOpenSetting] = useState(false)

    const getCaseInfo = () => {
        apiResponse({ case_id: case_id }, "case/get-case-by-id.php").then(res => {
            setState({ ...res })
            getUserNameById(res.responsible_id)
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
            <div className="set__case__ico">
                <img className="setImg" src={setImg} alt=""
                    onClick={() => { setOpenSetting(!openSetting) }} />
                {
                    (checkRight(post.level, "editOwnCase") || checkRight(post.level, "editSomeonesCase")) &&
                    <div>
                        <img className="editImg" src={editImg} alt=""
                            onClick={() => {
                                setEditActive(true)
                            }} />
                    </div>}
            </div>


            <div className="case__contact__info">
                {state.meta?.profileImg?.link ?
                    <CaseProfilePhoto profileImg={state.meta.profileImg.link.link} getCaseInfo={getCaseInfo} case_id={case_id} />
                    :
                    <CaseProfilePhoto profileImg={null} getCaseInfo={getCaseInfo} case_id={case_id} />}
                <div>
                    <CaseInfoBlock info={state} changeData={(key, value) => { handleDataChange(key, value) }} changeGeneral={(key, value) => { handleGeneralChange(key, value) }} />
                    <GroupConnections case_id={case_id} type={"case"}/>
                </div>
            </div>

            <div className="container__grid__two">
                <DetailedInfo info={state.data} changeData={(key, value) => { handleDataChange(key, value) }}/>
                <Plan plans={state.plans} case_id={case_id} getCaseInfo={getCaseInfo} />
            </div>
            <div className="container__grid__two">
                <GiveHelps helps={state.helps} case_id={case_id} getCaseInfo={getCaseInfo} />
                <Notes case_id={case_id} getCaseInfo={getCaseInfo} notes={state.notes} />
            </div>

            {/* <div className="media__content__">
                <Galery media={post.newPhotos} title="Медіа фото" />
            </div> */}
            {/* <PhotosForm photos = {post.photos} show = {post.level?.loadCaseFiles == true || post.level?.root == "true" ? true : false}/> */}
            {state?.meta?.files?.length && <GalleryBlock data={state.meta.files} />}
            <FilesUploader successHandler={getCaseInfo} multiple={false} meta={{
                key: "case_files",
                case_id: case_id,
                type: "case"
            }} />
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
