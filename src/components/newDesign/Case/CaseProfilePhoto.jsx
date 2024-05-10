import React, { useEffect, useState } from "react";
import PhotoUploader from "../../elements/Uploaders/PhotoUploader";
import defaultImg from "./../../../img/default_profile.png";
import { Edit } from "@mui/icons-material";

const CaseProfilePhoto = (props)=>{

    const [edit, setEdit] = useState({show: false})
    const [state, setState] = useState({
        ...props
    })
    useEffect(()=>{
        setState({...state, ...props})
    },[props.profileImg])
    
    return(
        <div className="CaseProfilePhoto">
            {
                !edit.show ? <div>
                    <Edit onClick={()=>{setEdit({show:true})}}/>
                    <img className="CaseProfilePhoto-img" src={state.profileImg ? state.profileImg : defaultImg }/>
                </div>
                : <PhotoUploader close={()=>setEdit({...edit, show: false})} successHandler={(data)=>{
                    setEdit({...edit, show:false})
                   setState({...state, profileImg: data[0].link})
                }} multiple={false} meta={{
                    key: "case_profile_img",
                    case_id: state.case_id,
                    type: "case"
                }} />
            }
            
             
                
        </div>
    )
}
export default CaseProfilePhoto;