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
import { appConfig, LANG } from "../../../services/config";
import PersonalInfo from "./PersonalInfo";
import TextEditor from "../../elements/TextEditor/TextEditor";
import Files from "./Files";
import Fields from "./Fields";
import Histories from "./Histories";
import { Button, Rating, Switch } from "@mui/material";
import FieldsBlock from "./FieldsBlock";
import CaseLikePDF from "./CaseLikePDF";
import Icon from "../../elements/Icons/Icon";
import Modal from "../../Modals/Modal";
import FooterDefaultModal from "../../Modals/FooterDefaultModal";
import { DateRange } from "@mui/icons-material";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DateField } from '@mui/x-date-pickers/DateField';

const Case = () => {
    const downloadGallery = AccessCheck('yes_no', 'a_page_case_media_download')
    const superUser = AccessCheck('super',"");
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
    const [ancetaForm, setAncetaForm] = useState({
        showForm: false,
        activeAnceta: false,
        showQuestionForm: false,
        list: [],
        anceta: {},
        questions: [],
        answer: {}
    });
    const [errorAlert, setErrorAlert] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)
    const getAncetsList = (mode) => {
        apiResponse({case_id: case_id, mode}, "ancets/get-list.php").then(res => {
            if (res.status) {
                setAncetaForm({...ancetaForm, list: res.ancets})
            }
        })
    }
    const getAnceta = (id) => {
        apiResponse({case_id: case_id, anceta_id: id}, "ancets/get-by-id.php").then(res => {
            if (res.status) {
                setAncetaForm({...ancetaForm, anceta: res.anceta, questions: res.questions, showQuestionForm: true, showForm: false})
            }
        })
    }

    const prepareAnswerData = () => {
        const {anceta, answer, questions} = ancetaForm;

        const dataList = questions.map((item)=>{
            return {
                "ancet_id": anceta.id,
                "question_id": item.id,
                "client_id": case_id,
                "answer": answer[item.id]
            }
        })
        
        return dataList;
    }

    const sendAncetaAnswer = () => {
        const allExist = ancetaForm.questions.every(key => key.id in ancetaForm.answer);
        if (!allExist) return setErrorAlert(true);

        const data = prepareAnswerData();
        console.log(data);
        apiResponse({case_id: case_id, anceta_id: ancetaForm.anceta.id, answers: data}, "ancets/add-answers.php").then(res => {
            if (res.status) {
                setAncetaForm({...ancetaForm, anceta: {}, questions: [], showQuestionForm: false, showForm: false});
                setSuccessAlert(true)
            }
        })
    }
    const getCaseInfo = () => {
        apiResponse({ case_id: case_id }, "case/get-case-by-id.php").then(res => {
            const user_id = res?.general?.user_id;
            const responsible_id = res?.general?.responsible_id;
            const user_id_active = user.user_id;
           
            setCg(user_id == user_id_active || responsible_id == user_id_active || superUser);
            const viewInfo = generateViews(res.userMeta?.case_view_info ? res.userMeta.case_view_info.value : {});
            setState({
                ...res, viewInfo: viewInfo
            });
        })
    }
    useEffect(() => {
        getCaseInfo();
        getAncetsList('cases');
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
    const printPDF = () => {
         apiResponse({case_id: case_id}, 'mpdf/printcard.php').then((res)=>{
            if (res.status) {
                const a = document.createElement("a");
                a.href = res.link;
                a.download = "Case_pdf"; // Можна вказати ім'я файлу, або залишити порожнім
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        })
    }
    const openAncetaForm = () => {
        setAncetaForm({...ancetaForm, showForm: true})
    }
    const access = {
        case_connection_view: AccessCheck("view_edit", "a_page_case_connection", "view"),
        case_simple_info_view: AccessCheck("view_edit", "a_page_case_simple_info", "view"),
        case_plan_view: AccessCheck("view_edit", "a_page_case_plan", "view"),
        case_help_view: AccessCheck("view_edit", "a_page_case_help", "view"),
        case_notes_view: AccessCheck("view_edit", "a_page_case_notes", "view"),
        case_files_view: AccessCheck("view_edit", "a_page_case_files", "view"),
        case_media_view: AccessCheck("view_edit", "a_page_case_media", "view"),
        case_media_edit: AccessCheck("view_edit", "a_page_case_media", "edit"),
        super: AccessCheck('super')
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
                {/* <Switch checked={modeDisplay} onChange={(e)=>{
                    setModeDisplay(e.target.checked);
                    localStorage.setItem("case_mode_display", e.target.checked ? 1 : 0)
                }}/> */}
                <Button disabled={ancetaForm.list.length == 0} onClick={openAncetaForm}><Icon icon='quiz'/></Button>
                <Button onClick={printPDF}><Icon icon='print'/></Button>
                <Button onClick={() => { setOpenSetting(!openSetting) }}><Icon icon="check-list"/></Button>
                {/* <img src={setImg} alt=""
                    onClick={() => { setOpenSetting(!openSetting) }} /> */}
                {/* {
                    (checkRight(post.level, "editOwnCase") || checkRight(post.level, "")) &&
                    <div>
                        <img className="editImg" src={editImg} alt="" editSomeonesCase
                            onClick={() => {
                                setEditActive(true)
                            }} />
                    </div>} */}
            </div>
            
            {/* {modeDisplay ? <CaseLikePDF caseData={state}/> : */}
            <>
            <div className="flex">
                {(state.viewInfo.view_InfoBlock) && <CaseInfoBlock cg={cg} profileImg={state.meta?.profileImg?.link ? state.meta.profileImg.link.link : null} case_id={case_id} getCaseInfo={getCaseInfo} info={state} changeData={(key, value) => { handleDataChange(key, value) }} changeGeneral={(key, value) => { handleGeneralChange(key, value) }} />}
            </div>
            <div>
                {state?.fieldsMeta && <FieldsBlock cg={cg} getCaseInfo={getCaseInfo} works={state.fieldsMeta.works} contacts={state.fieldsMeta.contacts} another={state.fieldsMeta.another} case_id={case_id}/>}
                
            </div>
            {(state.viewInfo.view_GroupConnection && (access.case_connection_view || access.super)) &&
                <GroupConnections cg={cg} case_id={case_id} type={"case"}/>
            }
            <div className="info__column">
                
                {(state.viewInfo.view_DetailedInfo && (access.case_simple_info_view || access.super)) &&
                    <DetailedInfo cg={cg} info={state.data} case_id={case_id} changeData={(key, value) => { handleDataChange(key, value) }} />
                }
                {(state.viewInfo.view_Fields && (access.case_simple_info_view || access.super)) &&
                    <Fields cg={cg} fields={state.fields} case_id={case_id} getCaseInfo={getCaseInfo} />
                }
                {(state.viewInfo.view_Plan && (access.case_plan_view || access.super)) &&
                    <Plan cg={cg} plans={state.plans} case_id={case_id} getCaseInfo={getCaseInfo} />
                }
                {(state.viewInfo.view_Help && (access.case_help_view || access.super)) &&
                    <GiveHelps cg={cg} helps={state.helps} case_id={case_id} getCaseInfo={getCaseInfo} />
                }
                {(state.viewInfo.view_Notes && (access.case_notes_view || access.super)) &&
                    <Notes cg={cg} case_id={case_id} getCaseInfo={getCaseInfo} notes={state.notes} />
                }
                {(state.viewInfo.view_Files && (access.case_files_view || access.super)) && <Files cg={cg} case_id={case_id} getCaseInfo={getCaseInfo} files={state.files} />}
                {(state.viewInfo.view_Histories && (access.case_media_view || access.super)) && <Histories cg={cg} data={state.meta.history_files} getCaseInfo={getCaseInfo} case_id={case_id} />}
            </div>

            {!!state?.meta?.files?.length && (state.viewInfo.view_Gallery && (access.case_media_view || access.super)) &&
                <GalleryBlock cg={cg} check={downloadGallery} data={state.meta.files} />}
            {state.viewInfo.view_FileUploader && (access.case_media_edit || access.super) &&
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
            {ancetaForm.showForm && 
                <Modal 
                    closeHandler={()=>{setAncetaForm({...ancetaForm, showForm: false})}}
                    header={LANG.ancets.active_ancets}
                >
                    <div>
                        {ancetaForm.list.map(item => {
                            console.log(item)
                            return (
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    columnGap:'20px'
                                }}>
                                    <Button key={item.id} onClick={()=>{getAnceta(item.id)}}> {item.name}</Button>
                                </div>
                                
                            )
                        })}
                    </div>
                </Modal>
            }
            {ancetaForm.showQuestionForm && 
                <Modal 
                    closeHandler={()=>{setAncetaForm({...ancetaForm, showQuestionForm: false})}}
                    header={ancetaForm.anceta.name}
                    footer={<FooterDefaultModal 
                        success={sendAncetaAnswer}
                        close={()=>{setAncetaForm({...ancetaForm, showQuestionForm: false})}}/>}
                >
                    <div className="Case-modal-body-answer">
                        <div className="Case-modal-body-answer-description">{LANG.ancets.question_description}</div>
                        <div className="Case-modal-body-answer-questions">{LANG.ancets.question}:</div>
                        {ancetaForm.questions.map((item, index) => {
                            const number = index + 1;
                            return (
                                <div key={item.id} className="Case-modal-body-answer-questions-item">
                                    <div className="Case-modal-body-answer-questions-item-question">{number}. {item.question}</div>
                                    <div className="Case-modal-body-answer-questions-item-answer">
                                    <Rating
                                        name="simple-controlled"
                                        value={ancetaForm.answer[item.id]}
                                        onChange={(event, newValue) => {
                                            setAncetaForm({...ancetaForm, answer: {...ancetaForm.answer, [item.id]: newValue}})
                                        }}
                                        max={item.type}
                                    />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </Modal>
            }
            {settingsAlert && <SmallNotification isSuccess={true} text={"Показ елементів оновлено"} close={() => { setSettingsAlert(false) }} />}
            {errorAlert && <SmallNotification isSuccess={false} text={"Не всі поля заповнено"} close={() => { setErrorAlert(false) }} />}
            {successAlert && <SmallNotification isSuccess={true} text={"Успіх"} close={() => { setSuccessAlert(false) }} />}
            </>

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
