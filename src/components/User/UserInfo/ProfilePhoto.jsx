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
    userName: {
      edit: false,
      value: ""
    },
    phone: {
      edit: false,
      value: ""
    },
    email: {
      edit: false,
      value: ""
    },
    work: {
      edit: false,
      value: ""
    },
  });

  useEffect(() => {
    setData({
      userName: {
        edit: false,
        value: userName
      },
      phone: {
        edit: false,
        value: phone
      },
      email: {
        edit: false,
        value: email
      },
      work: {
        edit: false,
        value: work
      },
    });
  }, [userName, phone, email, work]);

  const dispatch = useDispatch();
  let passObj = {
    id: localStorage.getItem("id"),
    token: localStorage.getItem("token"),
    pass: pass.newPass,
    olderPass: pass.olderPass
  };

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
    setData(prevData => ({
      ...prevData,
      [key]: { ...prevData[key], value: value }
    }));
  };

  const handleSaveData = (key, value) => {

    const originalValue = data[key].value;
    if (value !== originalValue) {
      let obj = {
        [key]:value,
        user_id:params.id
      };
      console.log(obj);
      handleChangeValue(key, value);
     apiResponse({...obj}, "user/update-user.php")
        .then((res) => {
          handleAlertChange("success", "Дані успішно оновлено");
          // dispatch(removeUser());
          console.log(res);
        })
        .catch((error) => console.log(error));
    } else {
      handleAlertChange("error", "Нові дані повинні відрізнятися від старих");
    }
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
          <InputBlock value={data.userName.value} header={true} title="Ім'я" label={data.userName.value}
             onChange={(e) => { handleChangeValue("userName", e.target.value) }} inputType="text"
            saveHandler={(value) => { handleSaveData("userName", value) }}
          />
          <InputBlock value={data.phone.value} title="Номер телефону" label={data.phone.value} icon={"phone"}
            link={`tel:${data.phone.value}`} onChange={(e) => { handleChangeValue("phone", e.target.value) }} inputType="number"
            saveHandler={(value) => { handleSaveData("phone", value) }}
          />

          <InputBlock value={data.email.value} title="Електронна пошта" label={data.email.value} icon={"email"}
            link={`mailto:${data.email.value}`} onChange={(e) => { handleChangeValue("email", e.target.value) }} inputType="text"
            saveHandler={(value) => { handleSaveData("email", value) }}
          />
      
          <InputBlock value={data.work.value} title="Робота" label={data.work.value} icon={"work"}
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
