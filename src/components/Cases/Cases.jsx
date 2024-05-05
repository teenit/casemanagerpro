import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { serverAddres } from "../Functions/serverAddres";
import LoadingPage from "../Loading/LoadingPage";
import GetCases from "./GetCases";

const Cases = ()=>{
    const [posts, setPosts] = useState("");
    const [page, setPage] = useState(
        {
            loading:true,
            cases:false,
            message:""
        }
    )
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
            
                <h2 style={{
                    textAlign:"center"
                }}>Кейси</h2>
                {posts ? <GetCases key={"oop"+Math.random()} posts={posts} postsChange= {(p)=>{setPosts(null);setPosts(p)}} />: null}
                </>
                

    )
}


export default Cases;