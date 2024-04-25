import React, { useState } from "react";
import PhotoUploader from "../../elements/Uploaders/PhotoUploader";
import defaultImg from "./../../../img/default_profile.png";
import { Edit } from "@mui/icons-material";

const CaseProfilePhoto = (props)=>{

    const [edit, setEdit] = useState({show: false})
  
    
    return(
        <div className="CaseProfilePhoto">
            {
                !edit.show ? <div>
                    <Edit onClick={()=>{setEdit({show:true})}}/>
                    <img className="CaseProfilePhoto-img" src={props.profileImg ? props.profileImg : defaultImg }/>
                </div>
                : <PhotoUploader close={()=>setEdit({...edit, show: false})} multiple={false} meta={{
                    key: "case_profile_img",
                    case_id: props.case_id,
                    type: "case"
                }} />
            }
            
             
                
        </div>
    )
}
export default CaseProfilePhoto;