import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";

const Case = () => {
    let params = useParams();
    const case_id = params.id;
    const [state, setState] = useState(null)

    useEffect(()=>{
        apiResponse({
            case_id:case_id
        },"case/get-full-info.php").then((res)=>console.log(res))
    },[])
    return (
        <div>
            Case Page {case_id}
        </div>
    )

}

export default Case;