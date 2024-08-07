import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../store/Slices/userSlice";
import Input from '../../elements/Inputs/Input';
import SmallNotification from "../../elements/Notifications/SmallNotification";
import { Button } from "@mui/material";
import { serverAddres } from "../../Functions/serverAddres";
import ProfilePhotoBlock from "../../blocks/ProfilePhotoBlock";
import InputBlock from "../../elements/Inputs/InputBlock";
import { apiResponse } from "../../Functions/get_apiObj";
import { useParams } from "react-router-dom";
import { LANG } from "../../../services/config";

const ProfilePhoto = ({ url, userName, email, changePass, phone, work }) => {
  const params = useParams()
  const [pass, setPass] = useState({
    olderPass: "",
    newPass: "",
    newPassTo: "",
    changeError: ""
  });
  const [alert, setAlert] = useState({
    success: false,
    error: false,
    message: ""
  });
  const [data, setData] = useState({
    userName: userName,
    phone: phone,
    email: email,
    work: work,
  });

  useEffect(() => {
    setData({
      userName: userName,
      phone: phone,
      email: email,
      work: work,
    });
  }, [userName, phone, email, work]);

  const dispatch = useDispatch();
  
  const handlePassObjChange = (key, value) => {
    setPass(prevPass => ({ ...prevPass, [key]: value }));
  };

  const handleAlertChange = (key, message = "") => {
    setAlert(prevAlert => ({
      ...prevAlert,
      [key]: !prevAlert[key],
      message: message
    }));
  };


  const handleChangeValue = (key, value) => {
    setData({...data, [key]:value});
  };

  const handleSaveData = (key, value) => {
      let obj = {
        [key]:value,
        user_id:params.id
      };

      apiResponse({...obj}, "user/update-user.php")
      .then((res) => {
        handleAlertChange("success", "Дані успішно оновлено");
        // dispatch(removeUser());
        handleChangeValue(key, value);
          console.log(res);
        })
        .catch((error) => console.log(error));
  };

  const checkPass = () => {
    if (pass.newPass !== pass.newPassTo) {
      handlePassObjChange("changeError", "Паролі не збігаються");
      handleAlertChange("error", "Паролі не збігаються");
      return;
    } else if (pass.newPass.length < 6) {
      handlePassObjChange("changeError", "Довжина паролю повинна бути більше 6 символів");
      handleAlertChange("error", "Довжина паролю повинна бути більше 6 символів");
      return;
    } else if (pass.olderPass.length < 1) {
      handlePassObjChange("changeError", "Введіть свій старий пароль для підтвердження особистості");
      handleAlertChange("error", "Введіть свій старий пароль для підтвердження особистості");
      return;
    }
    let passObj = {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      pass: pass.newPass,
      olderPass: pass.olderPass
    };
    axios({
      url: serverAddres("user/change-pass.php"),
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      data: JSON.stringify(passObj),
    })
      .then(() => {
        handleAlertChange("success", "Пароль успішно змінено. Через декілька секунд вас перекине на сторінку логіну");
        setTimeout(()=>{
          dispatch(removeUser());
        },10000)
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="ProfilePhoto">
      <div className="ProfilePhoto-left">
        <ProfilePhotoBlock profileImg={url} meta={{
          key: "user_profile_img",
          user_id: localStorage.getItem("id"),
          type: "user"
        }} />

        <div className="User-info">
          <InputBlock value={data.userName} header={true} title="Ім'я" label={data.userName}
             onChange={(e) => { handleChangeValue("userName", e.target.value) }} inputType="text"
            saveHandler={(value) => { handleSaveData("userName", value) }}
          />
          <InputBlock hintMessage={LANG.hints.phone} value={data.phone} title="Номер телефону" label={data.phone} icon={"phone"}
            link={`tel:${data.phone}`} onChange={(e) => { handleChangeValue("phone", e.target.value) }} inputType="number"
            saveHandler={(value) => { handleSaveData("phone", value) }}
          />

          <InputBlock hintMessage={LANG.hints.email} value={data.email} title="Електронна пошта" label={data.email} icon={"email"}
            link={`mailto:${data.email}`} onChange={(e) => { handleChangeValue("email", e.target.value) }} inputType="email"
            saveHandler={(value) => { handleSaveData("email", value) }}
          />
      
          <InputBlock value={data.work} title="Робота" label={data.work} icon={"work"}
            onChange={(e) => { handleChangeValue("work", e.target.value) }} inputType="text"
            saveHandler={(value) => { handleSaveData("work", value) }}
          />
        </div>
      </div>
      {changePass && <div className="User-pass">
        <p>Змінити пароль</p>
        <div className="User-pass-form">
          <Input
            label="Введіть старий пароль"
            type="password"
            id="change__pass__older"
            value={pass.olderPass}
            onChange={(e) => {
              handlePassObjChange("olderPass", e.target.value)
            }}
          />
          <Input
            label="Введіть новий пароль"
            type="password"
            id="change__pass"
            value={pass.newPass}
            onChange={(e) => {
              handlePassObjChange("newPass", e.target.value)
            }}
          />
          <Input
            label="Повторіть пароль"
            type="password"
            id="change__passto"
            value={pass.newPassTo}
            onChange={(e) => {
              handlePassObjChange("newPassTo", e.target.value)
            }}
          />
          <div>
            <Button variant="contained" onClick={checkPass}>Надіслати запит</Button>
          </div>
        </div>
      </div>}

      {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { handleAlertChange("success") }} />}
      {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { handleAlertChange("error") }} />}
    </div>
  );
};

export default ProfilePhoto;
