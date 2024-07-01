import React, { useState } from "react";
import style from "./ContactListItem.module.css";
import ContactForm from "../ContactForm/ContactForm";
import Modal from "../../Modals/Modal";
import Icon from "../../elements/Icons/Icon";
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
  const [deleteContact, setDeleteContact] = useState(false);

  const handleEditContact = () => {
    toggleEditContact(id);
  };

  const handleDeleteConfirmation = () => {
    setDeleteContact(true);
  };

  const handleCancelDelete = () => {
    setDeleteContact(false);
  };

  const handleConfirmDelete = () => {
    onDeleteContact(id);
    setDeleteContact(false);
  };

  return (
    <>
      {isEditContact === id && (
        <Modal closeHandler={toggleEditContact}>
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
        <ModalMessage
          header="Ви дійсно бажаєте видалити контакт?"
          footer={
            <>
              <Button variant="contained" onClick={handleConfirmDelete} aria-label="Видалити">
                Так
              </Button>
              <Button color="error" variant="contained" onClick={handleCancelDelete} aria-label="Відмінити">
                Ні
              </Button>
            </>
          }
        />
      )}

      <div className={style.contact_list} key={`card-${id}`}>
        <div className={style.contact_list_item}>{pib}</div>

        {phones.map(({ title, number }, index) => (
          <div className={style.contact_list_item_phones} key={`phone-${index}-${id}`}>
            <div>{title}</div>
            <a href={`tel:${number}`} type="tel">
              {number}
            </a>
          </div>
        ))}
        {Array.isArray(category) && category.map((item, index) => (
          <div className={style.contact_list_item} key={`category-${index}`}>
            {item.text}
          </div>
        ))}

        {info.email && (
          <div className={style.contact_list_item} key={`email-${id}`}>
            <a href={`mailto:${info.email}`} type="email">
              {info.email}
            </a>
          </div>
        )}

        {info.work && (
          <div className={style.contact_list_item} key={`work-${id}`}>
            {info.work}
          </div>
        )}

        {info.whoisit && (
          <div className={style.contact_list_item} key={`whoisit-${id}`}>
            {info.whoisit}
          </div>
        )}

        {info.site && (
          <div className={style.contact_list_item} key={`site-${id}`}>
            {info.site}
          </div>
        )}

        {info.info && (
          <div className={style.contact_list_item} key={`info1-${id}`}>
            {info.info}
          </div>
        )}

        <div className={style.contact_list_item_btn}>
          <span onClick={handleDeleteConfirmation}>
            <Icon icon={"delete"} addClass={"header-icon fs16"} />
          </span>
          <span onClick={handleEditContact}>
            <Icon icon={"edit"} addClass={"header-icon fs16"} />
          </span>
        </div>
      </div>
    </>
  );
};

export default ContactListItem;
