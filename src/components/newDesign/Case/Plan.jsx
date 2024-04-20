import React, { useState } from "react";
import editImg from "./../../../img/icons/edit.svg";
import saveImg from "./../../../img/icons/save-50.png";
import Input from "../../elements/Inputs/Input";
import 'moment/locale/uk';
import moment from "moment";
import { momentTime } from "../../../services/moment";
import { LANG } from "../../../services/config";
import Textarea from "../../elements/Inputs/Textarea";
import { changeApsBr } from "../../Functions/translateString";
import SelectStatusPlan from "../../elements/Selects/SelectStatusPlan";
import { Button } from "@mui/material";
import { apiResponse } from "../../Functions/get_apiObj";
const PlanElem = ({plan}) => {
    const [state, setState] = useState({
        ...plan,
        editPlan: false
    })
    const editHandler = () => {
        setState({...state, editPlan: true})
    }
    const saveHandler = () => {
        console.log(state)
        apiResponse({
            ...state,
            plan_id:state.id
        },"case/update-plan-task.php").then((res)=>{
            console.log(res)
            setState({...state, editPlan: false})
        })
        
    }
    const changeHandler = (key, value)=>{
        setState({
            ...state,
            [key]:value
        })
    }
    return (
        <div className="Plan-content-element">
            <div className="str">
            <div className="str-date">
                <div className="dates">
                    <div className="dates-start">
                        {
                            state.editPlan 
                            ? 
                                <>
                                <Input 
                                    type="datetime-local"
                                    label={LANG.start_time}
                                    value={state.start_time}
                                    variant="standard"
                                    onChange={(e)=>{
                                        console.log(e.target.value)
                                        changeHandler("start_time", e.target.value)
                                    }}
                                />
                                <Input 
                                    type="datetime-local"
                                    label={LANG.end_time}
                                    value={state.end_time}
                                    variant="standard"
                                    onChange={(e)=>{
                                        changeHandler("end_time", e.target.value)
                                    }}
                                />
                                </>
                            :
                                <>
                                    <span> {moment(state.start_time).format("LLL")} </span>
                                    <span> {moment(state.end_time).format("LLL")} </span>
                                </>
                        }
                    </div>
                </div>
                <div className="controls">
                    {
                        state.editPlan 
                        ? 
                            <img src={saveImg} onClick={saveHandler}/> 
                        : 
                            <img src={editImg} onClick={editHandler}/>
                    }
                </div>
                </div>
                <div className="task">
                    {
                        state.editPlan
                        ?
                            <div className="task-textarea">
                                <Textarea 
                                    label={LANG.task_plan}
                                    value={state.value}
                                    onChange={(e)=>{
                                        console.log(e)
                                        changeHandler("value", e.target.value)}}
                                />
                            </div>
                        :
                            <div className="task-value">
                                {
                                    state.value
                                }
                            </div>
                    }
                </div>
                <div className="bottom">
                    <div className="bottom-date">
                        {state.date_created}
                    </div>
                    <div className="bottom-status">
                        {
                            state.editPlan
                            ?
                                <SelectStatusPlan />
                            :
                            <div>
                                {
                                    LANG.status_plan[state.status]
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}


const Plan = ({plans, case_id}) => {
    const [state, setState] = useState({
        end_time:" ",
        start_time:" ",
        status:0,
        value:"",
        create:false
    })
    const changeHandler = (key, value)=>{
        setState({
            ...state,
            [key]:value
        })
    }
    const createPlan = () => {

        apiResponse({
            ...state,
            case_id: case_id,
        },"case/create-plan-task.php").then((res)=>{
            console.log(res)
        })
    }
    return (
        <div className="Plan">
            <div className="Plan-title">{LANG.planing}</div>
            <div className="content">
            <div className="Plan-content">
                {
                    plans.map(plan=><PlanElem key={plan.id} plan={plan}/>)
                }
            </div>
           {state.create && <div className="Plan-create">
                <div className="Plan-create-date">
                    <Input 
                        type="datetime-local"
                        label={LANG.start_time}
                        value={state.start_time}
                        variant="standard"
                        onChange={(e)=>{
                            console.log(e.target.value)
                            changeHandler("start_time", e.target.value)
                        }}
                    />
                    <Input 
                        type="datetime-local"
                        label={LANG.end_time}
                        value={state.end_time}
                        variant="standard"
                        onChange={(e)=>{
                            console.log(e.target.value)
                            changeHandler("end_time", e.target.value)
                        }}
                    />
                </div>
                <div className="Plan-create-status">
                    <div className="bold">{LANG.status}</div>
                    <SelectStatusPlan value={state.status} onChange={(e)=>changeHandler("status", e)}/>
                </div>
                <div className="Plan-create-value">
                    <Textarea 
                        label={LANG.task_plan}
                        value={state.value}
                        onChange={(e)=>{
                            console.log(e)
                            changeHandler("value", e.target.value)}}
                    />
                </div>
                
            </div>}
            </div>
            <div className="Plan-bottom">
                {
                    state.create ? <>
                        <Button onClick={()=>changeHandler("create", false)} color="error" variant="contained">{LANG.cancel}</Button>
                        <Button onClick={createPlan} variant="contained">{LANG.save}</Button>
                    </> : 
                    <Button onClick={()=>changeHandler("create", true)} variant="contained">{LANG.create_plan}</Button>
                }
                
            </div>
        </div>
    )
   
}
export default Plan