import React, { useState } from "react";
import style from "./ContactListItem.module.css";
import IconButton from "../IconButton/IconButton";
import { ReactComponent as DeleteContact } from "../../../img/icons/delete.svg";
import { ReactComponent as ChangeContact } from "../../../img/icons/change.svg";
import { ReactComponent as Close } from "../../../img/icons/close.svg";
import ContactForm from "../ContactForm/ContactForm";
import Modal from "../Modal/Modal";
import Icon from "../../elements/Icons/Icon"
import ModalMessage from "../../Modals/ModalMessage";
import { Button } from "@mui/material";

const ContactListItem = ({
  id,
  category,
  phones,
  pib,
  info,
  onDeleteContact,
  isEditContact,
  toggleEditContact,
  editContact,
}) => {
  const [deleteContact, handleDeleteContact] = useState(false);
  console.log(phones)
  const handleEditContact = (e) => {
    toggleEditContact(id);
  };

  return (
    <>
      {isEditContact === id && (
        <Modal onClose={toggleEditContact}>
          <ContactForm
            editContact={editContact}
            onSubmit={handleEditContact}
            contact={{ id, category, phones, pib, info }}
            showModal={isEditContact}
            toggleModal={toggleEditContact}
          />
        </Modal>
      )}

      {deleteContact && (
        <ModalMessage header="Ви дійсно бажаєте видалити контакт?" footer={
          <>
            <Button variant="contained" onClick={() => onDeleteContact(id)} aria-label="Видалити">
              <span>Так</span>
            </Button>
            <Button color="error" variant="contained"
              onClick={() => handleDeleteContact(false)}
              aria-label="Видалити"
            >
              <span>Ні</span>
            </Button>
            </>
        }/>
      )}

      <div className={style.contact_list} key={"kard" + id}>
        <div className={`${style.contact_list_item} `}>{pib}</div>

        {phones.map(({ title, number }) => (
          <div
            className={`${style.contact_list_item_phones} `}
            key={"phone" + number + id}
          >
            <div>{title}</div>
            <a href={`tel:${number}`} type="tel">
              {number}
            </a>
          </div>
        ))}
        {console.log(category)}
        {category.map(({ text }) => (
          <div className={`${style.contact_list_item} `} key={text}>
            {text}
          </div>
        ))}

        {info.email && (
          <div className={`${style.contact_list_item} `} key={"email" + id}>
            <a href={`mailto:${info.email}`} type="email">
              {info.email}
            </a>
          </div>
        )}

        {info.work && (
          <div className={`${style.contact_list_item} `} key={"work" + id}>
            {info.work}
          </div>
        )}

        <div className={`${style.contact_list_item} `} key={"info" + id}>
          {info.whoisit}
        </div>

        {info.site && (
          <div className={`${style.contact_list_item} `} key={"site" + id}>
            {info.site}
          </div>
        )}

        {info.info && (
          <div className={`${style.contact_list_item}`} key={"info1" + id}>
            {info.info}
          </div>
        )}

        <div className={style.contact_list_item_btn}>
          <span onClick={() => handleDeleteContact(true)}>
            <Icon icon={"delete"} addClass={"default-icon"} />
          </span>
          <span onClick={handleEditContact}>
            <Icon icon={"edit"} addClass={"default-icon"} />
          </span>
        </div>
      </div>
    </>
  );
};

export default ContactListItem;
