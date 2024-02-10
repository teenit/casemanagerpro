import React, { useState } from "react";
import style from "./ContactListItem.module.css";
import IconButton from "../IconButton/IconButton";
import { ReactComponent as DeleteContact } from "../../../img/icons/delete.svg";
import { ReactComponent as ChangeContact } from "../../../img/icons/change.svg";
import { ReactComponent as Close } from "../../../img/icons/close.svg";
import ContactForm from "../ContactForm/ContactForm";
import Modal from "../Modal/Modal";

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
        <Modal onClose={toggleEditContact}>
          <p>Ви дійсно бажаєте видалити контакт?</p>
          <IconButton onClick={() => onDeleteContact(id)} aria-label="Видалити">
            <span>Так</span>
          </IconButton>
          <IconButton
            onClick={() => handleDeleteContact(false)}
            aria-label="Видалити"
          >
            <span>Ні</span>
          </IconButton>
        </Modal>
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
          <IconButton
            onClick={() => handleDeleteContact(true)}
            aria-label="Видалити"
          >
            <DeleteContact width="20" height="20" />
          </IconButton>
          <IconButton
            id={id}
            onClick={handleEditContact}
            aria-label="Редагувати"
          >
            <ChangeContact width="20" height="20" />
          </IconButton>
        </div>
      </div>
    </>
  );
};

export default ContactListItem;
