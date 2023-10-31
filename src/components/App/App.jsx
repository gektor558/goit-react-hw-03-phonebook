import React, { Component } from 'react';
import contactData from '../../../src/contactData.json';
import { nanoid } from 'nanoid';
import ContactForm from '../ContactForm/ContactForm';
import Filter from '../Filter/Filter';
import ContactList from '../ContactList/ContactList';
import Notification from '../Notification/Notification';
import { Wrapper } from './App.styled';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {
  state = {
    contacts: contactData,
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    if (contacts?.length) {
      this.setState({ contacts });
    }
  }
  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      window.localStorage.setItem(
        'contacts',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  handleAddContact = contactData => {
    const { contacts } = this.state;
    const nameExists = contacts.find(
      contact =>
        contact.name.toLocaleLowerCase().trim() ===
        contactData.name.toLocaleLowerCase().trim()
    );

    if (nameExists) {
      toast.info(`${contactData.name} is already in your contacts.`);
      return;
    } else {
      const newContact = { id: nanoid(), ...contactData };
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  handleContactFilter = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  handleDeleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const { contacts } = this.state;
    const handleContactFilter = this.handleContactFilter();
    return (
      <>
        <Wrapper>
          <h1>Phonebook</h1>
          <ContactForm addContact={this.handleAddContact} />
          <h2>Contacts List</h2>
          <Filter filteredContacts={this.handleChangeFilter} />
          {contacts.length ? (
            <ContactList
              list={handleContactFilter}
              onDeleteContact={this.handleDeleteContact}
            />
          ) : (
            <Notification message="Your contact list is empty" />
          )}
        </Wrapper>
      </>
    );
  }
}