import React, { useEffect, useState } from "react";
import PhotoUploader from "../../elements/Uploaders/PhotoUploader";
import defaultImg from "./../../../img/default_profile.png";
import Icon from "../../elements/Icons/Icon";

const CaseProfilePhoto = (props) => {
    const [edit, setEdit] = useState(false);
    const [file,setFile] = useState(null)
    const [state, setState] = useState({
        ...props
    });

    useEffect(() => {
        setState({ ...state, ...props });
    }, [props.profileImg]);

    const handleFileChange = (value) => {
            setEdit(true);
            setFile(value[0])
    };

    return (
        <div className="CaseProfilePhoto">
            {!edit ? (
                <div>
                    <label htmlFor="fileInput">
                        <Icon icon={"edit"} addClass={"default-icon"} />
                    </label>
                    <input type="file" name="fileInput" id="fileInput" style={{ display: "none" }} multiple={false} onChange={(e)=>{handleFileChange(e.target.files)}}/>
                    <img className="CaseProfilePhoto-img" src={state.profileImg ? state.profileImg : defaultImg} />
                </div>
            ) : (
                <PhotoUploader
                    close={() => setEdit(false)}
                    successHandler={(data) => {
                        setEdit(false);
                        setState({ ...state, profileImg: data[0].link });
                    }}
                    multiple={false}
                    meta={{
                        key: "case_profile_img",
                        case_id: state.case_id,
                        type: "case"
                    }}
                    file={file}
                />
            )}
        </div>
    );
};

export default CaseProfilePhoto;
