import React from "react";

import style from "./ContactList.module.css";
import ContactListItem from "../ContactListItem/ContactListItem";

const ContactList = ({
  contacts,
  onDeleteContact,
  isEditContact,
  editContact,
  toggleEditContact,
}) => {
  return (
    <div className={style.wr__contact__list}>
      {contacts.map((contact, indx) => (
        <div key={indx}>
          {indx !== 0 && contacts[indx - 1].pib[0] !== contact.pib[0] ? (
            <h2>{contact.pib[0]}</h2>
          ) : (
            ""
          )}

          {indx === 0 ? <h2>{contact.pib[0]}</h2> : ""}

          <ContactListItem
            onDeleteContact={onDeleteContact}
            {...contact}
            indx={indx}
            key={"kard" + contact.id}
            isEditContact={isEditContact}
            toggleEditContact={toggleEditContact}
            editContact={editContact}
          />
        </div>
      ))}
    </div>
  );
};

export default ContactList;
