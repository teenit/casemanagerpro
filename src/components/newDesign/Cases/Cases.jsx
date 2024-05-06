import React, { useEffect, useState } from "react";
import { apiResponse } from "../../Functions/get_apiObj";
import GetCases from "../../Cases/GetCases";

const Cases = ()=>{
    const [state, setState] = useState()
    useEffect(()=>{
        apiResponse({},"case/get/cases-page-list.php").then((res)=>{
            setState(res)
        })
    },[])
    return(
        <div>
            {state && <GetCases posts={state} postsChange= {(p)=>{setState(null);setState(p)}} />}
            
        </div>
    )
}

export default Cases;