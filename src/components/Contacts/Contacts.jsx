import React, { Component } from "react";

import style from "./Contacts.module.css";
import ContactList from "./ContactList/ContactList";
import ContactForm from "./ContactForm/ContactForm";
import Modal from "./Modal/Modal";
import IconButton from "./IconButton/IconButton";
// import { ReactComponent as Close } from "../../img/icons/close.svg";
import { ReactComponent as Add } from "../../img/icons/add.svg";
import {
  fetchContscts,
  addContact,
  deleteContact,
  editContact,
} from "../../services/contacts-api";
import Loadpic from "../Loading/Interactive/Loadpic";
import LoadingPage from "../Loading/LoadingPage";

export class Contacts extends Component {
  state = {
    contacts: [],
    showModal: false,
    isEditContact: "",
    isLoading: false,
    elementHeight: 0,
  };

  componentDidMount() {
    this.toggleLoading();
    fetchContscts()
      .then((data) => {
        let arreyContact = data.sort(function (a, b) {
          let nameA = a.pib.toLowerCase(),
            nameB = b.pib.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        console.log(arreyContact);

        this.setState({
          contacts: arreyContact,
        });
      })
      .catch((error) => console.log(error))
      .finally(this.toggleLoading);

    // const contacts = localStorage.getItem("contacts");
    // const parsedContacts = JSON.parse(contacts);
    // if (parsedContacts) {
    //   this.setState({
    //     contacts: parsedContacts,
    //   });
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    // Перевірка чі є щось в Локал
    if (this.setState.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }

    // Перевірка чі додалась новий контакт
    // if (
    //   this.state.contacts.length > prevState.contacts.length &&
    //   prevState.contacts.length !== 0
    // ) {
    //   this.toggleModal();
    // }
  }

  addContact = ({ category, pib, phones, info }) => {
    const contact = {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      phones,
      pib,
      info,
      category,
    };

    this.toggleLoading();

    addContact(contact)
      .then((data) => {
        let arreyContact = data.sort(function (a, b) {
          let nameA = a.pib.toLowerCase(),
            nameB = b.pib.toLowerCase();
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        });

        this.setState(() => ({
          contacts: arreyContact,
        }));

        this.toggleModal();
      })
      .catch((error) => console.log(error))
      .finally(this.toggleLoading);

    // this.toggleModal();
  };

  toggleModal = () => {
    this.setState((state) => ({
      showModal: !state.showModal,
    }));
  };

  deleteContact = (contactId) => {
    let deleteСontact = {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      contactID: contactId,
    };

    this.toggleLoading();

    deleteContact(deleteСontact)
      .then((data) => alert(data.text))
      .catch((error) => console.log(error))
      .finally(this.toggleLoading);

    this.setState((prevState) => ({
      contacts: prevState.contacts.filter(
        (contact) => contact.id !== contactId
      ),
    }));
  };

  editContact = ({ category, pib, phones, info, id }) => {
    const editedContact = {
      id: localStorage.getItem("id"),
      token: localStorage.getItem("token"),
      phones,
      pib,
      info,
      category,
      contactID: id,
    };

    this.toggleLoading();

    editContact(editedContact)
      .then((data) => {
        this.setState({ isEditContact: "" });
      })
      .catch((error) => console.log(error))
      .finally(this.toggleLoading);

    this.setState((prevState) => ({
      contacts: [
        ...prevState.contacts.map((item) =>
          item.id === id ? { category, pib, phones, info, id } : item
        ),
      ],
    }));
  };

  toggleEditContact = (id) => {
    this.setState({ isEditContact: id });
  };

  toggleLoading = () => {
    this.setState((prevState) => ({
      isLoading: !prevState.isLoading,
    }));
  };

  render() {
    const { contacts, showModal, isEditContact, isLoading } = this.state;

    return true ? (
      <>
        {isLoading && <Loadpic show={"active"} />}
        <section className={`${style.section_contact} ${style.responsive}`}>
          <h2>Контакти</h2>

          <IconButton
            onClick={this.toggleModal}
            color={"#fcaf1d"}
            position={true}
            aria-label="Додати контакт"
          >
            <Add width="50" height="50" />
          </IconButton>

          <ContactList
            isEditContact={isEditContact}
            contacts={contacts}
            onDeleteContact={this.deleteContact}
            toggleEditContact={this.toggleEditContact}
            editContact={this.editContact}
            toggleModal={this.toggleModal}
          />

          {showModal && (
            <Modal onClose={this.toggleModal}>
              <ContactForm
                onSubmit={this.addContact}
                toggleModal={this.toggleModal}
                showModal={showModal}
              />
            </Modal>
          )}
        </section>
      </>
    ):(
      <div className="page__loading">
        <LoadingPage effload={false} message = {"Даний розділ ТЕЛЕФОННА КНИГА у процесі розробки (найближчим часом буде зроблено)"} />
      </div>
    );
  }
}

export default Contacts;
