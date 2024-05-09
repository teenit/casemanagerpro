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
import editImg from "../../../img/icons/edit.svg"
import DoneIcon from '@mui/icons-material/Done';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { Button } from "@mui/material";
import { LANG } from "../../../services/config";
import Modal from "../../Modals/Modal"
import FilesUploader from "../../elements/Uploaders/FilesUploader";
import PhotoUploader from "../../elements/Uploaders/PhotoUploader";
const ProfilePhoto = ({ url, userName, email, changePass, phone }) => {
  const [pass, setPass] = useState({
    olderPass: "",
    newPass: "",
    newPassTo: "",
    changeError: ""
  })
  const [loading, setLoading] = useState("");
  const [modal, setModal] = useState(false)
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    errorPass: false
  })
  const [data, setData] = useState({
    phone: {
      edit: false,
      value: ""
    },
    email: {
      edit: false,
      value: ""
    }
  })
  useEffect(() => {
    setData({
      phone: {
        edit: false,
        value: phone
      },
      email: {
        edit: false,
        value: email
      }
    })
  }, [phone, email])

  const dispatch = useDispatch();
  let passObj = {
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
    pass: pass.newPass,
    olderPass: pass.olderPass
  };
  const hadnlePassObjChange = (key, value) => {
    setPass(prevPass => ({ ...prevPass, [key]: value }))
  }
  const handleAlertChange = (key) => {
    setAlert((prevAlert) => ({ ...prevAlert, [key]: !prevAlert[key] }))
  }
  const handleChangeEdit = (key) => {
    setData((prevData) => ({
      ...prevData,
      [key]: { ...prevData[key], originalValue: prevData[key].value, edit: !prevData[key].edit }
    }))
  }
  const handleChangeValue = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: { ...prevData[key], value: value }
    }))
  }
  const handleSaveData = (key, value) => {
    const originalValue = data[key].originalValue
    if (value !== originalValue) {
      handleAlertChange("success")
    } else {
      handleAlertChange("error")
    }
  };
  const checkPass = () => {
    if (pass.newPass !== pass.newPassTo) {
      hadnlePassObjChange("changeError", "Паролі не збігаються")
      handleAlertChange("errorPass")
      return;
    } else if (pass.newPass.length < 6) {
      hadnlePassObjChange("changeError", "Довжина паролю повинна бути більше 6 символів")
      handleAlertChange("errorPass")

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
  }
  // const changePic = (data) => {
  //   const formCaseEdit = document.getElementById(data);
  //   const formData = new FormData();
  //   let imagefile = document.getElementById("uploadbtn");
  //   // return console.log(imagefile.files[0])
  //   formData.append("image", imagefile.files[0]);
  //   formData.append("id", window.location.search.slice(1));
  //   formData.append("key", "user");
  //   axios({
  //     url: serverAddres("upload-case-img.php"),
  //     method: "POST",
  //     header: { "Content-Type": "multipart/form-data" },
  //     data: formData,
  //     onUploadProgress: (event) => {
  //       setLoading("active");
  //       console.log(Math.round((event.loaded * 100) / event.total));
  //     },
  //   })
  //     .then((data) => {
  //       localStorage.setItem("profilePhoto", data.data);
  //       // return console.log(data.data)
  //       window.location.reload();
  //       setLoading("");
  //     })
  //     .catch((error) => console.log(error));
  // };
  return (
    <div className="case__contact__info__img">
      <div className="case__contact__info__img__left">
        <div className="case__contact__info__img__inner">
          <img src={`${url}`} alt="Фото профілю" />
          <Loadpic show={loading} />
          {changePass ? <form id="caseImgEdit">
            <Button variant="contained" onClick={() => { setModal(true) }}>Завантажити фото</Button>
          </form> : ""}
        </div>

        <div className="user_info">
          <h1 className="user_info_name">{userName}</h1>
          {data.phone.edit ?
            <div className="user_info_phone">
              <Input type="number" onChange={(e) => { handleChangeValue("phone", e.target.value) }} label="Номер телефону" value={data.phone.value} />
              <DoneIcon width="20" height="20" onClick={() => {
                handleChangeEdit("phone")
                handleSaveData("phone", data.phone.value)
              }} />
            </div>
            :
            <div className="user_info_phone">
              <Phone
                width="20"
                height="20"
              />
              {data.phone.value}
              <ModeEditIcon width="20" height="20" onClick={() => { handleChangeEdit("phone") }} />
            </div>
          }

          {data.email.edit ?
            <div className="user_info_phone">
              <Input onChange={(e) => { handleChangeValue("email", e.target.value) }} label="Email" value={data.email.value} />
              <DoneIcon width="20" height="20" onClick={() => {
                handleChangeEdit("email")
                handleSaveData("email", data.email.value)
              }} />
            </div>
            :
            <div className="user_info_phone">
              <Email
                width="20"
                height="20"
              />
              {data.email.value}
              <ModeEditIcon width="20" height="20" onClick={() => { handleChangeEdit("email") }} />
            </div>
          }
        </div>
      </div>
      {changePass ? <div className="change_password">
        <p>Змінити пароль</p>
        <div className="wrap__change__form">
          <Input
            label="Введіть старий пароль"
            type="password"
            id="change__pass__older"
            value={pass.olderPass}
            onChange={(e) => {
              hadnlePassObjChange("olderPass", e.target.value)
            }}
          />
          <Input
            label="Введіть новий пароль"
            type="password"
            id="change__pass"
            value={pass.newPass}
            onChange={(e) => {
              hadnlePassObjChange("newPass", e.target.value)
            }}
          />
          <Input
            label="Повторіть пароль"
            type="password"
            id="change__passto"
            value={pass.newPassTo}
            onChange={(e) => {
              hadnlePassObjChange("newPassTo", e.target.value)
            }}
          />
          <div>
            <Button variant="contained" onClick={checkPass}>Надіслати запит</Button>
          </div>
        </div>

      </div> : ""}
      {modal && <Modal header="Змінити фотографію" closeHandler={() => { setModal(false) }}>
        <PhotoUploader close={() => { setModal(false) }} multiple={false} meta={{
          key: "user_img_profile",
          case_id: 11,
          type: "user"
        }} />
      </Modal>}
      {alert.success && <SmallNotification isSuccess={true} text={"Дані успішно оновлено"} close={() => { handleAlertChange("success") }} />}
      {alert.error && <SmallNotification isSuccess={false} text="Нові дані повинні відрізнятися від старих" close={() => { handleAlertChange("error") }} />}
      {alert.errorPass && <SmallNotification isSuccess={false} text={pass.changeError} close={() => { handleAlertChange("errorPass") }} />}
    </div>
  );
};
export default ProfilePhoto;
