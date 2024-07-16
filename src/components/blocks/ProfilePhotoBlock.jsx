import React, { useEffect, useState } from "react";
import Icon from "../elements/Icons/Icon";
import PhotoUploader from "../elements/Uploaders/PhotoUploader";
import defaultImg from "../../img/default_profile.png";

const ProfilePhotoBlock = ({ profileImg, meta }) => {
    const [hover, setHover] = useState(false);
    const [edit, setEdit] = useState(false);
    const [file, setFile] = useState(null);
    const [state, setState] = useState(profileImg);

    useEffect(() => {
        setState(profileImg);
    }, [profileImg]);

    const handleFileChange = (value) => {
        setEdit(true);
        setFile(value[0]);
    };

    return (
        <div className="ProfilePhotoBlock" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {!edit ? (
                <div>
                    {hover && (
                        <div className="ProfilePhotoBlock-hover">
                            <label htmlFor="fileInput">
                                <Icon icon={"edit"} addClass={"default-icon fs35"} />
                            </label>
                            <input
                                type="file"
                                name="fileInput"
                                id="fileInput"
                                style={{ display: "none" }}
                                multiple={false}
                                onChange={(e) => handleFileChange(e.target.files)}
                            />
                        </div>
                    )}
                    <img className="ProfilePhotoBlock-img" src={state || defaultImg} />
                </div>
            ) : (
                <PhotoUploader
                    close={() => setEdit(false)}
                    successHandler={(data) => {
                        setEdit(false);
                        setState(data[0].link);
                    }}
                    multiple={false}
                    meta={meta}
                    file={file}
                />
            )}
        </div>
    );
};

export default ProfilePhotoBlock;
