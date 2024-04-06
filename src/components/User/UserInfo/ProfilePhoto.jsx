import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Loadpic from "../../Loading/Interactive/Loadpic";
import { serverAddres } from "../../Functions/serverAddres";
import { ReactComponent as Phone } from "../../../img/icons/iphone.svg";
import { ReactComponent as Email } from "../../../img/icons/email.svg";
import { ReactComponent as User } from "../../../img/icons/user.svg";
import { removeUser } from "../../../store/Slices/userSlice";
import { useDispatch } from "react-redux";
import Input from '../../elements/Inputs/Input'
const ProfilePhoto = ({ url, userName, email,changePass,phone }) => {
  const [loading, setLoading] = useState("");
  const [olderPass, setOlderPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassTo, setNewPassTo] = useState("");
  const [changeError, setChangeError] = useState("");
  const dispatch = useDispatch();
  let passObj = {
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
    pass: newPass,
    olderPass: olderPass
  };

  const changePic = (data) => {
    const formCaseEdit = document.getElementById(data);
    const formData = new FormData();
    let imagefile = document.getElementById("uploadbtn");
    // return console.log(imagefile.files[0])
    formData.append("image", imagefile.files[0]);
    formData.append("id", window.location.search.slice(1));
    formData.append("key", "user");
    axios({
      url: serverAddres("upload-case-img.php"),
      method: "POST",
      header: { "Content-Type": "multipart/form-data" },
      data: formData,
      onUploadProgress: (event) => {
        setLoading("active");
        console.log(Math.round((event.loaded * 100) / event.total));
      },
    })
      .then((data) => {
        localStorage.setItem("profilePhoto", data.data);
        // return console.log(data.data)
        window.location.reload();
        setLoading("");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="case__contact__info__img">
      <div className="case__contact__info__img__left">
      <div className="case__contact__info__img__inner">
        <img src={`${url}`} alt="" />
        <Loadpic show={loading} />
        {changePass ? <form id="caseImgEdit">
          <label htmlFor="uploadbtn" className="case__edit__img">
            Змінити
          </label>
          <Input
            onChangeCapture={() => {
              changePic("caseImgEdit");
            }}
            multiple
            id="uploadbtn"
            type="file"
            name="uploadbtn"
          />
        </form>:""}
      </div>
      <div className="user_info">
        <h1 className="user_info_name">{userName}</h1>
        <div className="user_info_phone">
          <Phone
            width="20"
            height="20"
          />
          {phone}
        </div>
        <div className="user_info_mail">
          <Email
            width="20"
            height="20"
          />
          {email}
        </div>
      </div>
      </div>
      {changePass ? <div className="change_password">
        <p>Змінити пароль</p>
        <div className="wrap__change__form">
          <Input
            label="Введіть старий пароль"
            type="password"
            id="change__pass__older"
            value={olderPass}
            onChange={(e) => {
              setOlderPass(e.target.value);
            }}
          />
          <Input
          label="Введіть новий пароль"
            type="password"
            id="change__pass"
            value={newPass}
            onChange={(e) => {
              setNewPass(e.target.value);
            }}
          />
          <Input
          label="Повторіть пароль"
            type="password"
            id="change__passto"
            value={newPassTo}
            onChange={(e) => {
              setNewPassTo(e.target.value);
            }}
          />
          <div className="error__changeovery">
            <p>{changeError}</p>
          </div>
          <div>
            <button
              className="primary__btn"
              onClick={() => {
                if (newPass !== newPassTo) {
                  setChangeError("Паролі не збігаються");
                  return;
                } else if (newPass.length < 6) {
                  setChangeError(
                    "Довжина паролю повинна бути більше 6 символів"
                  );
                  return;
                }
                axios({
                  url: serverAddres("user/change-pass.php"),
                  method: "POST",
                  header: { "Content-Type": "application/json;charset=utf-8" },
                  data: JSON.stringify(passObj),
                })
                  .then((data) => {
                    alert(data.data.message);
                    dispatch(removeUser())
                    
                  })
                  .catch((error) => console.log(error));
              }}
            >
              Надіслати запит
            </button>
          </div>
        </div>
      </div>:""}
    </div>
  );
};
export default ProfilePhoto;
