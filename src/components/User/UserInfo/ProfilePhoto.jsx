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

const ProfilePhoto = ({ getUser, changePass, url, user }) => {
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
    userName: user.userName,
    phone: user.phone,
    email: user.email,
    datas: user.datas,
  });

  useEffect(() => {
    setData({
      userName: user.userName,
      phone: user.phone,
      email: user.email,
      datas: user.datas,
    });
  }, [user.userName, user.phone, user.email, user.datas]);

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
    setData({ ...data, [key]: value });
  };

  const handleSaveData = (key, value) => {
    let obj = {
      [key]: value,
      user_id: params.id
    };

    apiResponse({ ...obj }, "user/update-user.php")
      .then((res) => {
        window.location.reload()
      })
      .catch((error) => console.log(error));
  };

  const checkPass = () => {
    if (pass.newPass !== pass.newPassTo) {
      handlePassObjChange("changeError",LANG.USER_PAGE.alert_messages.doesnt_match);
      handleAlertChange("error", LANG.USER_PAGE.alert_messages.doesnt_match);
      return;
    } else if (pass.newPass.length < 6) {
      handlePassObjChange("changeError", LANG.USER_PAGE.alert_messages.too_short);
      handleAlertChange("error", LANG.USER_PAGE.alert_messages.too_short);
      return;
    } else if (pass.olderPass.length < 1) {
      handlePassObjChange("changeError",LANG.USER_PAGE.alert_messages.old_pass );
      handleAlertChange("error", LANG.USER_PAGE.alert_messages.old_pass);
      return;
    }
    let passObj = {
      pass: pass.newPass,
      olderPass: pass.olderPass
    };
    apiResponse({ ...passObj }, "user/change-pass.php").then(() => {
      handleAlertChange("success", LANG.USER_PAGE.alert_messages.success_pass);
      setTimeout(() => {
        dispatch(removeUser());
      }, 10000)
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
        }} remove={false} />

        <div className="User-info">
          <InputBlock value={data.userName} header={true} title={LANG.GLOBAL.name} label={data.userName}
            onChange={(e) => { handleChangeValue("userName", e.target.value) }} inputType="text"
            saveHandler={(value) => { handleSaveData("userName", value) }}
          />
          <InputBlock titleDefault={LANG.GLOBAL.phone} hintMessage={LANG.hints.phone} value={data.phone} title={LANG.GLOBAL.phone}
            label={data.phone} icon={"phone"}
            link={`tel:${data.phone}`} onChange={(e) => { handleChangeValue("phone", e.target.value) }} inputType="number"
            saveHandler={(value) => { handleSaveData("phone", value) }}
          />

          <InputBlock disabled titleDefault={LANG.GLOBAL.email} hintMessage={LANG.hints.disabled} value={data.email}
            title={LANG.GLOBAL.email}
            label={data.email} icon={"email"}
            link={`mailto:${data.email}`} inputType="email"
          />

          <InputBlock titleDefault={LANG.GLOBAL.about} value={data.datas} title={LANG.GLOBAL.about} label={data.datas} icon={"book"}
            onChange={(e) => { handleChangeValue("datas", e.target.value) }} inputType="text"
            saveHandler={(value) => { handleSaveData("datas", value) }}
          />
        </div>
      </div>
      {changePass && <div className="User-pass">
        <p>{LANG.USER_PAGE.change_pass}</p>
        <div className="User-pass-form">
          <Input
            label={LANG.USER_PAGE.old_pass}
            type="password"
            id="change__pass__older"
            value={pass.olderPass}
            onChange={(e) => {
              handlePassObjChange("olderPass", e.target.value)
            }}
          />
          <Input
            label={LANG.USER_PAGE.new_pass}
            type="password"
            id="change__pass"
            value={pass.newPass}
            onChange={(e) => {
              handlePassObjChange("newPass", e.target.value)
            }}
          />
          <Input
            label={LANG.USER_PAGE.confirm_pass}
            type="password"
            id="change__passto"
            value={pass.newPassTo}
            onChange={(e) => {
              handlePassObjChange("newPassTo", e.target.value)
            }}
          />
          <div>
            <Button variant="contained" onClick={checkPass}>{LANG.USER_PAGE.send}</Button>
          </div>
        </div>
      </div>}

      {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={() => { handleAlertChange("success") }} />}
      {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { handleAlertChange("error") }} />}
    </div>
  );
};

export default ProfilePhoto;
