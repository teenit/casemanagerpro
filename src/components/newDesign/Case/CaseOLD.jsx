import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";
import CasePhoto from "../../Cases/Case/Info/CasePhoto";
import CaseShortInfo from "../../Cases/Case/Info/Caseshortinfo";
import GetConnections from "../../Cases/Case/Info/GetConnections";
import JournalActive from "../../Cases/Case/Info/JournalActive";
import Input from "../../elements/Inputs/Input";
import Notes from "../../Cases/Case/Info/Notes";
import CaseGiveHelp from "../../Cases/Case/Info/CaseGiveHelp";
import Galery from "../../Galery/Galery";
import PhotosForm from "../../Cases/Case/PhotosForm";
import EditCaseInfo from "../../Cases/Case/Info/EditCaseInfo";
import SetCase from "../../Cases/Case/Info/SetCase";
import LoadingPage from "../../Loading/LoadingPage";
import setImg from "../../../img/icons/settings-50-black.png";
import editImg from "../../../img/icons/edit-48-black.png";
import cameraImg from "../../../img/icons/camera-48-black.png";
import { checkRight } from "../../Functions/checkRight";
import {serverAddres } from "../../Functions/serverAddres";
import { giveGoodPhotosCase } from "../../Functions/giveGoodPhotos";
import PlanActive from "../../Cases/Case/Info/PlanActive";
import axios from "axios";

const CaseOLD = () => {
    const [post, setPost] = useState({id:"",contact:{caseName:""},photos:[],notes:[]});
    let params = useParams();
    const case_id = params.id;
    const [state, setState] = useState(null)
    const [editActive, setEditActive] = useState(null)
    const [openSetting, setOpenSetting] = useState(false)
    const [page, setPage] = useState({
        loading:true,
        cases:false,
        message:""
    })

    const successHandler=()=>{
        let obj = {
            "id":case_id,
            "userId":localStorage.getItem("id"),
            "token": localStorage.getItem("token")
        }
        axios({
            url: serverAddres("get-case.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 

            let res = data.data;
            console.log(data.data)
            if(res?.message){
                setPage({...page,message:res.message})
                return console.log(res.message)
                }
                res.contact = JSON.parse(res.contact);
                res.activity = JSON.parse(res.activity);
                if(res.plan.length !== 0){
                 res.plan = JSON.parse(res.plan);
                }
               // return console.log(res.photos)
                if(res.photos !== null && res.photos !== ""){
                 res.photos = JSON.parse(res.photos);
                // return console.log(res.photos)
                 res.newPhotos = giveGoodPhotosCase(res.photos);
                }else{
                 res.photos = [];
                 res.newPhotos = [];
                }
                if(res.notes !== null && res.notes !== ""){
                 res.notes = JSON.parse(res.notes);
                }else{
                 res.notes = [];
                }
                setPost(res)
        })
        .catch((error)=>console.log(error)) 
    }
    useEffect(()=>{
        apiResponse({
            case_id:case_id
        },"case/get-full-info.php").then((res)=>console.log(res))
        successHandler()
        apiResponse({case_id:case_id}, "case/get-case-by-id.php").then(res=>console.log(res))
    },[])
    function saveInfoDogovir(){
        let dateDogovir = document.getElementById("dogovirDate");
        let numberDogovir = document.getElementById("dogovirNumber");
        let obj = {
            caseId:window.location.search.slice(1),
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token"),
            dateDogovir:dateDogovir.value,
            numberDogovir:numberDogovir.value
        }
        axios({
            url: serverAddres("case/save-infoCase.php"),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj)
        })
        .then((data)=>{ 
            console.log(data)
          // window.location.reload()        
        })
        .catch((error)=>console.log(error))  
    }
    return !!post.id ?(
        <div className="case__wrap">
            <div className="set__case__ico">
                <img className="setImg" src={setImg} alt=""
                onClick={()=>{setOpenSetting(!openSetting)}} />
                {
                    checkRight(post.level, "editOwnCase") || checkRight(post.level, "editSomeonesCase") && post.contact.userId !== localStorage.getItem("id")
                ?<div>
                <img className="editImg" src={editImg} alt=""
                onClick={()=>{
                    setEditActive(true)
                }} />
            </div> : null}   

            <img src={cameraImg} alt="" />
            </div>
        <div className="case__contact__info">
            <div>
                <CasePhoto url={`${post.contact.imgUrl}`} level = {checkRight(post.level, "editOwnCase")} />
            </div>
            <div><h1 className="case__title">{post.contact.surname} {post.contact.firstName} {post.contact.secondName} <span>№ {post.id}</span></h1>
                <CaseShortInfo info = {post.contact} />  
                <GetConnections id={post.id}/> 
            </div>     
  
        </div> 
        <div className="container__grid__two">   
            {false ? <JournalActive info={post.activity} /> : ""}
            
            { post.contact.dateDogovir.length > 1 ? <PlanActive info = {post.plan == "" ? null : post.plan} level = {checkRight(post.level, "createIndividualPlan")}/> : 
            <div className="plan__active">
                <h2>Індивідуальний план</h2>
                <p>Неможливо встановити Індивідуальний, необхідно заключити договір з клієнтом</p>
                {checkRight(post.level, "editOwnCase") ? <div className="grod">
                    <label htmlFor="dogovirDate">Дата<Input type="date" id="dogovirDate"/></label>
                    <label htmlFor="dogovirNumber">Номер<Input type="text" id="dogovirNumber"/></label>
                    <button className="primary__btn padding20px" onClick={saveInfoDogovir}>Зберегти інформацію</button>
                </div>:"" } 
            </div>}
            <Notes notes = {post.notes} level={checkRight(post.level, "notesCase")}/>
            <CaseGiveHelp level={checkRight(post.level, "helpesCase")}/>
        </div>
        
        <div className="media__content__">
        <Galery media = {post.newPhotos} title="Медіа фото"/>
            
        </div>    
            <PhotosForm photos = {post.photos} show = {post.level?.loadCaseFiles == true || post.level?.root == "true" ? true : false}/>
            {editActive ? <EditCaseInfo caseInfo = {post.contact} close = {()=>{
                setEditActive(null)
            }}/>:null}
            {openSetting ? <SetCase id={post.id} caseInfo = {post.contact} level = {post.level} close = {()=>{setOpenSetting(!openSetting)}}/> : null}
        </div>
        
    ):(
        <>
            <div className="page__loading">
                <LoadingPage message={page.message} effload = {page.effload}/>
            </div>
        </>
    )

}

export default CaseOLD;