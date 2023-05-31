import { Filter } from '../Filter/Filter';
import { Contacts } from '../Contacts/Contacts';
import { Form } from '../Form/Form';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  LOCAL_CONTACTS = 'local-contacts';

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem(this.LOCAL_CONTACTS));
    if (contacts) {
      this.setState({ contacts: contacts });
    }
  }

  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem(
        this.LOCAL_CONTACTS,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  checkName = name => {
    return this.state.contacts.find(contact => contact.name === name)
      ? true
      : false;
  };

  addContact = obj => {
    const { name, number } = obj;
    if (this.checkName(name)) {
      alert(`${name} already exists`);
    } else {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };
      this.setState(prevState => ({
        contacts: [newContact, ...prevState.contacts],
      }));
    }
  };

  handleFilter = event => {
    this.setState({
      filter: event.target.value,
    });
  };

  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  getContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const allContacts = this.getContacts();
    return (
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <Form addContact={this.addContact}></Form>
        <h2 className={css.title}>Contacts</h2>
        <Filter
          handleFilter={this.handleFilter}
          filter={this.state.filter}
        ></Filter>
        <Contacts
          allContacts={allContacts}
          removeContact={this.removeContact}
        ></Contacts>
      </div>
    );
  }
}
