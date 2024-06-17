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
import Icon from "../../elements/Icons/Icon";
import { NavLink } from "react-router-dom";
const ProfilePhoto = ({ url, userName, email, changePass, phone }) => {
  const [pass, setPass] = useState({
    olderPass: "",
    newPass: "",
    newPassTo: "",
    changeError: ""
  })
  const [loading, setLoading] = useState("");
  const [editPhoto, setEditPhoto] = useState(false)
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
      let obj = {
        id: localStorage.getItem("id"),
        token: localStorage.getItem("token"),
        pass: pass.newPass,
        olderPass: pass.olderPass
      };
      handleChangeValue(key,value)
      handleAlertChange("success")
      axios({
        url: serverAddres("user/change-pass.php"),
        method: "POST",
        header: { "Content-Type": "application/json;charset=utf-8" },
        data: JSON.stringify(obj),
      })
        .then((data) => {
          alert(data.data.message);
          dispatch(removeUser())
  
        })
        .catch((error) => console.log(error));
    } else {
      handleAlertChange("error")
    }
  };
  const InputBlock = ({ saveHandler, disabled = false, inputType = "text", value = "", onChange, link = null, title = "", icon = null, label = "" }) => {
    const [showEdit, setShowEdit] = useState(false);
    const [stateValue, setStateValue] = useState(value);

    const handleSave = () => {
        setShowEdit(false)
        handleSaveData(icon,stateValue)
    };

    return (
        <div className="User-InputBlock">
            {!showEdit && (
                <div className="User-InputBlock-default">
                    <p>{title}</p>
                    <div className="User-InputBlock-default-content">
                        {icon && <Icon icon={icon} addClass={"default-icon"} />}
                        <div title={title}>
                            {link ? <NavLink to={link}>{title}</NavLink> : value}
                        </div>
                        {!disabled && (
                            <div className="edit-icon" onClick={() => setShowEdit(true)}>
                                <Icon icon={"edit"} addClass={"default-icon"} />
                            </div>
                        )}
                    </div>
                </div>
            )}
            {showEdit && (
                <div className="User-InputBlock-editer">
                    <div className="User-InputBlock-editer-withicon">
                        {icon && <Icon icon={icon} addClass={"default-icon"} />}
                        <Input
                            type={inputType}
                            value={stateValue}
                            onChange={(e) => setStateValue(e.target.value)}
                        />
                    </div>
                    <div>
                        <span onClick={() => setShowEdit(false)}>
                            <Icon icon={"close"} addClass={"close-icon"} />
                        </span>
                        <span onClick={handleSave}>
                            <Icon icon={"save"} addClass={"save-icon"} />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
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

  return (
    <div className="ProfilePhoto">
      <div className="ProfilePhoto-left">
        {editPhoto ?
          <PhotoUploader previousImg={`${url}`} close={() => { setEditPhoto(false) }} multiple={false} meta={{
            key: "user_img_profile",
            case_id: 11,
            type: "user"
          }} />
          :
          <div className="ProfilePhoto-inner">
            {changePass && <span onClick={() => { setEditPhoto(true) }}>
              <Icon icon={"edit"} addClass={"default-icon"} />
            </span>}
            <img src={`${url}`} alt="Фото профілю" />
            <Loadpic show={loading} />
          </div>
        }


        <div className="User-info">
          <h1 className="User-info-name">{userName}</h1>    
        <InputBlock value={data.phone.value} title="Номер телефону" label={data.phone.value} icon={"phone"}
        onChange={(e)=>{handleChangeValue("phone",e.target.value)}} inputType="number"
        saveHandler={(value)=>{handleSaveData("phone",value)}}
        />

        <InputBlock value={data.email.value} title="Електронна пошта" label={data.email.value} icon={"email"}
        onChange={(e)=>{handleChangeValue("email",e.target.value)}} inputType="text"
        saveHandler={(value)=>{handleSaveData("email",value)}}
        />
        </div>
      </div>
      {changePass ? <div className="User-pass">
        <p>Змінити пароль</p>
        <div className="User-pass-form">
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

      {alert.success && <SmallNotification isSuccess={true} text={"Дані успішно оновлено"} close={() => { handleAlertChange("success") }} />}
      {alert.error && <SmallNotification isSuccess={false} text="Нові дані повинні відрізнятися від старих" close={() => { handleAlertChange("error") }} />}
      {alert.errorPass && <SmallNotification isSuccess={false} text={pass.changeError} close={() => { handleAlertChange("errorPass") }} />}
    </div>
  );
};
export default ProfilePhoto;
