import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { serverAddres } from "../Functions/serverAddres";
import LoadingPage from "../Loading/LoadingPage";
import GetCases from "./GetCases";
import AddCaseForm from "./newDesign/AddCaseForm";
import FilesUploader from "../elements/Uploaders/FilesUploader";
import { apiResponse } from "../Functions/get_apiObj";
import SelectStatusPlan from "../elements/Selects/SelectStatusPlan";

const Cases = ()=>{
    const [posts, setPosts] = useState("");
    const [page, setPage] = useState(
        {
            loading:true,
            cases:false,
            message:""
        }
    )
    const testPlan = () => {
        apiResponse({
            case_id:11,
            plan_id:1,
            status: 7,
            start_time: "27-05-1585 17:15:25",
            end_time: "30-05-1585 17:15:25",
            value:"vivuer re fhebrhf erferjfgerf er fgerfvyuevrfeyfe rfuyrergfyefu erf"
        },"case/update-plan-task.php").then(res=>console.log(res))
    }
    useEffect(()=>{
        let obj = {
            id: localStorage.getItem("id"),
            token: localStorage.getItem("token")
        }
        axios({
            url: serverAddres('get-cases.php'),
            method: "POST",
            header : {'Content-Type': 'application/json;charset=utf-8'},
            data : JSON.stringify(obj),
        })
        .then((data)=>{ 
            console.log(data.data)
           // return console.log(data.data)
            if(data.data?.message){
                setPage(
                    {
                        effload:false,
                        message: data.data.message,
                        loading:true
                    }
                )
            }else if(data.data.length == 0){
                setPage(
                    {
                        effload:false,
                        message: "Немає доступних кейсів",
                        loading:true
                    }
                ) 
            }else{
                let pos = data.data.map(elem=>JSON.parse(elem))
                setPosts(pos)  
                console.log(pos)
                setPage({
                    loading:false
                })
            }
        })
        .catch((error)=>console.log(error)) 
 
    },[])

    return page.loading ? (    
        <div className="page__loading">
            <LoadingPage message={page.message} effload = {page.effload}/>
        </div>
    ):(
                <>
                <SelectStatusPlan value={1} onChange={(item)=>console.log(item)}/>
                <button onClick={testPlan}>Test plan</button>
                <AddCaseForm />
                <FilesUploader multiple={false} meta={{
                    key:"test",
                    case_id:11,
                    type:"case"
                }} />
                <h2 style={{
                    textAlign:"center"
                }}>Кейси</h2>
                {posts ? <GetCases key={"oop"+Math.random()} posts={posts} postsChange= {(p)=>{setPosts(null);setPosts(p)}} />: null}
                </>
                

    )
}


export default Cases;