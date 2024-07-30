import React, { useState, useEffect } from "react";
import style from "./Contacts.module.css";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import {
  fetchContscts,
  addContact,
  deleteContact,
  editContact,
} from "../../services/contacts-api";
import Loadpic from "../Loading/Interactive/Loadpic";
import LoadingPage from "../Loading/LoadingPage";
import Icon from "../elements/Icons/Icon";
import Modal from "../Modals/Modal";
import SmallNotification from "../elements/Notifications/SmallNotification";

const Contacts = () => {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditContact, setIsEditContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    toggleLoading();
    fetchContscts()
      .then((data) => {
        let sortedContacts = data.sort((a, b) => {
          let nameA = a.pib.toLowerCase(),
            nameB = b.pib.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setContacts(sortedContacts);
      })
      .catch((error) => console.log(error))
      .finally(toggleLoading);

    // Uncomment if you want to load contacts from localStorage
    // const contacts = localStorage.getItem("contacts");
    // const parsedContacts = JSON.parse(contacts);
    // if (parsedContacts) {
    //   setContacts(parsedContacts);
    // }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);
  const [alert, setAlert] = useState({
    success: false,
    error: false,
  })
  const alertHandler = (key) => {
    setAlert({ ...alert, [key]: !alert[key] })
  }
  const addContactHandler = ({ category, pib, phones, info }) => {
    const contact = {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      phones,
      pib,
      info,
      category,
    };

    toggleLoading();

    addContact(contact)
      .then((data) => {
        let sortedContacts = data.sort((a, b) => {
          let nameA = a.pib.toLowerCase(),
            nameB = b.pib.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        setContacts(sortedContacts);
        toggleModal();
      })
      .catch((error) => console.log(error))
      .finally(toggleLoading);
  };

  const toggleModal = () => {
    setShowModal((prevShowModal) => !prevShowModal);
  };

  const deleteContactHandler = (contactId) => {
    const deleteСontact = {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      contactID: contactId,
    };

    toggleLoading();

    deleteContact(deleteСontact)
      .then((data) => alertHandler("success"))
      .catch((error) => {console.log(error); alertHandler("error")})
      .finally(toggleLoading);

    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
  };

  const editContactHandler = ({ category, pib, phones, info, id }) => {
    const editedContact = {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      phones,
      pib,
      info,
      category,
      contactID: id,
    };

    toggleLoading();

    editContact(editedContact)
      .then((data) => {
        setIsEditContact("");
      })
      .catch((error) => console.log(error))
      .finally(toggleLoading);

    setContacts((prevContacts) =>
      prevContacts.map((item) =>
        item.id === id ? { category, pib, phones, info, id } : item
      )
    );
  };

  const toggleEditContact = (id) => {
    setIsEditContact(id);
  };

  const toggleLoading = () => {
    setIsLoading((prevIsLoading) => !prevIsLoading);
  };

  return false ? (
    <>
      {isLoading && <Loadpic show={"active"} />}
      <section className={`${style.section_contact} ${style.responsive}`}>
        <div className={style.title}>
          <span>Контакти</span>
          <span onClick={toggleModal}>
            <Icon icon={"add"} />
          </span>
        </div>

        <ContactList
          isEditContact={isEditContact}
          contacts={contacts}
          onDeleteContact={deleteContactHandler}
          toggleEditContact={toggleEditContact}
          editContact={editContactHandler}
          toggleModal={toggleModal}
        />

        {showModal && (
          <Modal closeHandler={toggleModal}>
            <ContactForm
              onSubmit={addContactHandler}
              toggleModal={toggleModal}
              showModal={showModal}
            />
          </Modal>
        )}
      </section>
      {alert.success && <SmallNotification isSuccess={true} text={"Контакт видалено успішно"} close={()=>{alertHandler("success")}}/>}
      {alert.error && <SmallNotification isSuccess={false} text={"Виникла помилка. Спробуйте пізніше"} close={()=>{alertHandler("error")}}/>}
    </>
  ) : (
    <LoadingPage effload={false} message={"Даний розділ у розробці"} />
  );
};

export default Contacts;
