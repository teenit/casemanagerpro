import React, { useEffect, useState } from "react";
import Icon from "../elements/Icons/Icon";
import PhotoUploader from "../elements/Uploaders/PhotoUploader";
import defaultImg from "../../img/default_profile.png";
import { serverAddres } from "../Functions/serverAddres";
import { apiResponse } from "../Functions/get_apiObj";
import ModalConfirm from "../Modals/ModalConfirm"
import { LANG } from "../../services/config";
const ProfilePhotoBlock = ({ profileImg, meta, data = null, editor = true, remove = true, deleteProfilePhoto = () =>{} }) => {
    const [hover, setHover] = useState(false);
    const [edit, setEdit] = useState(false);
    const [confirmDelete, setConfrimDelete] = useState(false)
    const [file, setFile] = useState(null);
    const [state, setState] = useState(profileImg);
    const moment = require("moment");

    const images = {
        male: [
            serverAddres("media/default/m-young.png"),
            serverAddres("media/default/m-middle.png"),
            serverAddres("media/default/m-old.png"),
        ],
        female: [
            serverAddres("media/default/f-young.png"),
            serverAddres("media/default/f-middle.png"),
            serverAddres("media/default/f-old.png"),
        ],
        other: [
            serverAddres("media/default/o-young.png"),
            serverAddres("media/default/o-middle.png"),
            serverAddres("media/default/o-old.png"),
        ],
        default: defaultImg,
    };

    useEffect(() => {
        setState(profileImg);
    }, [profileImg]);

    const howOldIsCase = (birthday) => {
        if (!birthday) return null;
        const birthDate = moment(birthday);
        const age = moment().diff(birthDate, "years");
        return age;
    };

    const handleFileChange = (value) => {
        setEdit(true);
        setFile(value[0]);
    };

    const getImage = () => {
        if (!data && !profileImg) return images.default;
        if (profileImg) return profileImg;
        if (data && data.sex && data.sex.trim().length > 0) {
            const age = howOldIsCase(data.age);
            if (age !== null) {
                if (age < 18) {
                    return images[data.sex][0];
                }
                if (age >= 18 && age <= 50) {
                    return images[data.sex][1];
                }
                return images[data.sex][2];
            } else {
                return images[data.sex][1];
            }
        }
        return images.default;
    };
    const deletePhoto = () => {
       deleteProfilePhoto()
    }
    return (
        <div
            className="ProfilePhotoBlock"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            {!edit ? (
                <div>
                    {hover && editor && (
                        <div className="ProfilePhotoBlock-hover">
                            <label htmlFor="fileInput">
                                <Icon icon={"edit"} addClass={"default-icon fs35"} />
                            </label>
                            {state && remove && <Icon icon={"delete"} addClass={"delete-icon fs35"} onClick={()=>{setConfrimDelete(true)}} />}
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
                    <img
                        className="ProfilePhotoBlock-img"
                        src={getImage()}
                        alt="Profile"
                        onError={(e) => {
                            e.target.src = images.default;
                        }}
                    />
                </div>
            ) : (
                <PhotoUploader
                    close={() => setEdit(false)}
                    successHandler={(data) => {
                        setEdit(false);
                       // setState(data[0].link);
                        window.location.reload();
                    }}
                    multiple={false}
                    meta={meta}
                    file={file}
                />
            )}
            {confirmDelete && <ModalConfirm closeHandler={()=>{setConfrimDelete(false)}} text={LANG.CASE_PAGE.delete_photo}
            successHandler={deleteProfilePhoto} />} 
        </div>
    );
};

export default ProfilePhotoBlock;
