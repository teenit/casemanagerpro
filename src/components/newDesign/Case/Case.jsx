import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";
import FilesUploader from "../../elements/Uploaders/FilesUploader";
import CasePhoto from "../../Cases/Case/Info/CasePhoto";
import CaseShortInfo from "../../Cases/Case/Info/ShortInfo/Caseshortinfo";
import GetConnections from "../../Cases/Case/Info/GetConnections";
import JournalActive from "../../Cases/Case/Info/JournalActive";
import PlanActive from "../../Cases/Case/Info/PlanActive";
import CaseGiveHelp from "../../Cases/Case/Info/CaseGiveHelp";
import Notes from "../../Cases/Case/Info/Notes";
import Galery from "../../Galery/Galery";
import PhotosForm from "../../Cases/Case/PhotosForm";
import EditCaseInfo from "../../Cases/Case/Info/EditCaseInfo";
import SetCase from "../../Cases/Case/Info/SetCase";
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

const Case = () => {
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

    const getCaseInfo = ()=> {
        apiResponse({ case_id: case_id }, "case/get-case-by-id.php").then(res => {
            setState({...res})
        })
    }
    useEffect(() => {
        getCaseInfo();
    }, [])
    const handleDataChange = (key, value) => {
        setState({ ...state, data: [...state.data] })
    }
    const handleGeneralChange = (key, value) => {
        setState({ ...state, general: { ...state.general, [key]: value } })
    }
    console.log(state);

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
                <img src={cameraImg} alt="" />
                
                {/* {editActive && <EditCaseInfo caseInfo = {state.general} close = {()=>{
                setEditActive(null)
            }}/>} */}
                {/* {openSetting ? <SetCase id={post.id} caseInfo={post.contact} level={post.level} close={() => { setOpenSetting(!openSetting) }} /> : null} */}

            </div>


            <div className="case__contact__info">
                <div>
                    <CasePhoto url={`${editImg}`} level={checkRight(post.level, "editOwnCase")} />
                </div>
                <div>
                    <CaseShortInfo info={state} />
                    <GetConnections id={state.general.id} />
                </div>
            </div>

            <div className="container__grid__two">
                <Plan plans={state.plans} case_id={case_id} getCaseInfo={getCaseInfo}/>
                <CaseGiveHelp level={checkRight(post.level, "helpesCase")} />
            </div>

            {/* <div className="media__content__">
                <Galery media={post.newPhotos} title="Медіа фото" />
            </div> */}
            {/* <PhotosForm photos = {post.photos} show = {post.level?.loadCaseFiles == true || post.level?.root == "true" ? true : false}/> */}

            <FilesUploader multiple={false} meta={{
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
