import React, { useState, useEffect } from "react";
import style from "./ContactForm.module.css";
import { fetchCategories } from "../../../services/contacts-api";
import Icon from "../../elements/Icons/Icon";
import Input from "../../elements/Inputs/Input";
import Textarea from "../../elements/Inputs/Textarea";
import { Button, MenuItem, Select } from "@mui/material";
import SmallNotification from "../../elements/Notifications/SmallNotification";

const ContactForm = ({ editContact, onSubmit, contact, showModal, toggleModal }) => {
  const initialState = {
    categori: [],
    category: contact?.category || "",
    pib: contact?.pib || "",
    phones: contact?.phones || [{ title: "", number: "" }],
    info: contact?.info || { email: "", work: "", whoisit: "", site: "", info: "" },
    id: contact?.id || null,
  };

  const [alert, setAlert] = useState({
    success: false,
    error: false,
    message: ""
  });

  const [state, setState] = useState(initialState);

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        const hasCategory = contact?.category[0]?.value ? contact?.category[0]?.value : data[0]?.value
        const initialCategory = contact ? hasCategory : data[0]?.value;
        setState((prevState) => ({
          ...prevState,
          categori: data,
          category: initialCategory
        }));
        console.log(initialCategory);
      })
      .catch((error) => console.log(error));
  }, [contact]);

  const handleChangePib = (value) => {
    setState({ ...state, pib: value });
  };

  const handleChangeInfo = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      info: { ...prevState.info, [key]: value },
    }));
  };

  const handleChangeSelect = (e) => {
    setState({ ...state, category: e.target.value });
  };

  const alertHandler = (key, message) => {
    setAlert({ ...alert, [key]: !alert[key], message: message });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.pib.length < 1 || state.phones[0].number.length !== 10) {
      return alertHandler("error", "Введіть ім'я та телефон контакту");
    }
    const { category, pib, info, phones, id } = state;
    const sendData = { category, pib, phones, info, id };

    if (id) {
      editContact(sendData);
    } else {
      onSubmit(sendData);
    }


  };

  const reset = () => {
    setState(initialState);
  };

  const handleChangeTel = (key, value, index) => {
    setState((prevState) => ({
      ...prevState,
      phones: prevState.phones.map((phone, i) =>
        i === index ? { ...phone, [key]: value } : phone
      ),
    }));
  };

  const addPhone = () => {
    setState((prevState) => ({
      ...prevState,
      phones: [...prevState.phones, { title: "", number: "" }],
    }));
  };

  const deletePhone = (index) => {
    setState((prevState) => ({
      ...prevState,
      phones: prevState.phones.filter((item, i) => i !== index),
    }));
  };

  return (
    <div className="ContactForm">
      <div className="ContactForm-split">
        <Input
          label="ПІБ"
          type="text"
          value={state.pib}
          onChange={(e) => handleChangePib(e.target.value)}
          name="pib"
          required
        />
        <label className="ContactForm-split-flex">
          <Select value={state.category} onChange={handleChangeSelect} required>
            {state.categori.map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.text}
              </MenuItem>
            ))}
          </Select>
        </label>
      </div>

      {state.phones.map((phone, i) => (
        <label key={i}>
          <div className="ContactForm-split-flex">
            <p>Телефон</p>
            {i ? (
              <span onClick={() => deletePhone(i)}>
                <Icon icon={"close"} addClass={"default-icon"} />
              </span>
            ) : (
              <span onClick={addPhone}>
                <Icon icon={"add"} addClass={"default-icon"} />
              </span>
            )}
          </div>
          <div className="ContactForm-split">
            <Input
              type="number"
              label="Номер телефону"
              data-index={i}
              value={phone.number}
              onChange={(e) => handleChangeTel("number", e.target.value, i)}
              required
            />
            <Input
              type="text"
              label="Мобільний, робочий..."
              data-index={i}
              value={phone.title}
              onChange={(e) => handleChangeTel("title", e.target.value, i)}
              required
            />
          </div>
        </label>
      ))}

      <div className="ContactForm-split">
        <Input
          className={style.Input_contact}
          label="Email"
          type="email"
          name="email"
          value={state.info.email}
          onChange={(e) => handleChangeInfo("email", e.target.value)}
        />
        <Input
          className={style.Input_contact}
          type="text"
          label="Місце роботи"
          name="work"
          value={state.info.work}
          onChange={(e) => handleChangeInfo("work", e.target.value)}
        />
      </div>

      <div className="ContactForm-split">
        <Input
          className={style.Input_contact}
          label="Хто це?"
          type="text"
          name="whoisit"
          value={state.info.whoisit}
          onChange={(e) => handleChangeInfo("whoisit", e.target.value)}
          required
        />
        <Input
          label="Сайт"
          type="text"
          name="site"
          value={state.info.site}
          onChange={(e) => handleChangeInfo("site", e.target.value)}
        />
      </div>

      <Textarea
        label="Інформація про контакт"
        value={state.info.info}
        onChange={(e) => handleChangeInfo("info", e.target.value)}
      />
      <Button variant="contained" onClick={handleSubmit}>
        {state.id ? "Редагувати" : "Зберегти"}
      </Button>
      {alert.error && <SmallNotification isSuccess={false} text={alert.message} close={() => { setAlert({ ...alert, error: false }) }} />}
    </div>
  );
};

export default ContactForm;
