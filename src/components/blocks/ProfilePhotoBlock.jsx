import React, { useEffect, useState } from "react";
import Icon from "../elements/Icons/Icon";
import PhotoUploader from "../elements/Uploaders/PhotoUploader";
import defaultImg from "../../img/default_profile.png";
import { serverAddres } from "../Functions/serverAddres";

const ProfilePhotoBlock = ({ profileImg, meta, data = null }) => {
    const [hover, setHover] = useState(false);
    const [edit, setEdit] = useState(false);
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
        console.log(profileImg)
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

    return (
        <div
            className="ProfilePhotoBlock"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
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
                    <img
                        className="ProfilePhotoBlock-img"
                        src={getImage()}
                        alt="Profile"
                        onError={(e) => {
                            e.target.src = images.default; // Встановлення дефолтного зображення у разі помилки
                        }}
                    />
                </div>
            ) : (
                <PhotoUploader
                    close={() => setEdit(false)}
                    successHandler={(data) => {
                        setEdit(false);
                        setState(data[0].link);
                        window.location.reload();
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
