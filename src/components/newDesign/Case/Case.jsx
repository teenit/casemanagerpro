import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiResponse } from "../../Functions/get_apiObj";
import FilesUploader from "../../elements/Uploaders/FilesUploader";

const Case = () => {
    let params = useParams();
    const case_id = params.id;
    const [state, setState] = useState(null)

    useEffect(()=>{
        apiResponse({case_id:case_id}, "case/get-case-by-id.php").then(res=>{
            setState({...res})
        })
    },[])
   console.log(state)
    return (
        <>
        <div className="Case">
            <div className="Case-info">
                <div className="profile-img"></div>
                <div className="profile-info">
                    <div className="general-info"></div>
                    <div className="data-info"></div>
                </div>
            </div>
        </div>
        
        <FilesUploader multiple={false} meta={{
            key:"case_files",
            case_id:case_id,
            type:"case"
        }} />
        </>
    )

}

export default Case;