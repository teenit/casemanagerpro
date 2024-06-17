import React, { useState, useEffect } from "react";
import axios from "axios";
import { serverAddres } from "../Functions/serverAddres";
import { NavLink } from "react-router-dom";
import "./recovery.css";
import ModalMessage from "../Modals/ModalMessage";
import { Button } from "@mui/material";
import Input from "../elements/Inputs/Input";
import SmallNotification from "../elements/Notifications/SmallNotification";

const Recovery = () => {
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryPass, setRecoveryPass] = useState("");
  const [recoveryPassto, setRecoveryPassto] = useState("");
  const [recoveryError, setRecoveryError] = useState("");
  const [modal, setModal] = useState(true);
  const [modalInfo, setModalInfo] = useState(false);
  const [showForm, setShowForm] = useState(false);
const [alert, setAlert] = useState({
    success:false,
    error:false,
    message:""
})
const alertHandler = (key, mes)=>{
    setAlert({...alert, [key]:!alert[key], message:mes})
}
  useEffect(() => {
    axios({
      url: serverAddres("user/check-recovery-pass.php"),
      method: "POST",
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      data: JSON.stringify({ hash: window.location.search.slice(1) }),
    })
      .then((data) => {
        setShowForm(data.data.active);
      })
      .catch((error) => console.log(error));
  }, []);
const handleSubmit = ()=>{
  if (recoveryPass !== recoveryPassto) {
    alertHandler("error", "Паролі не збігаються")
    return;
  } else if (recoveryPass.length < 6) {
    alertHandler("error", "Довжина паролю повинна бути більше 6 символів")
    return;
  }
  axios({
    url: serverAddres("user/recovery-pass.php"),
    method: "POST",
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    data: JSON.stringify({
      hash: window.location.search.slice(1),
      pass: recoveryPass,
    }),
  })
    .then((data) => {
      if (data.data.good) {
        setModalInfo({
          showModal: true,
          message: data.data.message,
          marker: "green",
        });
      } else {
        setModalInfo({
          showModal: true,
          message: data.data.message,
          marker: "red",
        });
      }
      setModal(true);
    })
    .catch((error) => console.log(error));
}
  return !showForm ? (
    <div className="recovery__wrap">Відновлення...</div>
  ) : (
    <div className="wrap__rec__form">
      <Input
        label="Введіть Email"
        type="text"
        name="rec__email"
        id="rec__email"
        value={recoveryEmail}
        onChange={(e) => {
          setRecoveryEmail(e.target.value);
        }}
      />
      <Input
        label="Введіть пароль"
        type="password"
        name="rec__pass"
        id="rec__pass"
        value={recoveryPass}
        onChange={(e) => {
          setRecoveryPass(e.target.value);
        }}
      />
      <Input
        label="Повторіть пароль"
        type="password"
        name="rec__passto"
        id="rec__passto"
        value={recoveryPassto}
        onChange={(e) => {
          setRecoveryPassto(e.target.value);
        }}
      />
      <div className="error__recovery">
        <p>{recoveryError}</p>
      </div>
        <Button variant="contained"onClick={handleSubmit}>Надіслати запит</Button>
      {modal ? (
        <ModalMessage>
          <p>{modalInfo.message}</p>
          <NavLink to="/login">Перейти до авторизації</NavLink>
          <Button variant="contained" onClick={() => { setModal(false); }}>ОК</Button>
        </ModalMessage>
      ) : (
        ""
      )}
      {alert.success && <SmallNotification isSuccess={true} text={alert.message} close={()=>{alertHandler("success", alert.message)}}/>}
      {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={()=>{alertHandler("error", alert.message)}}/>}
    </div>
  );
};

export default Recovery;
