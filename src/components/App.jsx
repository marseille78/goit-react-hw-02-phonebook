import { Component } from 'react';
import ContactForm from './contact-form';
import Filter from './filter';
import ContactList from './contact-list';

export class App extends Component {

  state = {
    contacts: [],
    filter: '',
  }

  getVisibleItems = () => {
    const {contacts, filter} = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().indexOf(filter) >= 0)
  }

  handleFilter = (text) => {
    this.setState({
      filter: text
    });
  }

  handleAddUser = (user) => {

    const names = this.state.contacts.map(userItem => userItem.name);

    if (names.includes(user.name)) {
      alert(`${user.name} is already in contacts`);
      return;
    }

    this.setState(({ contacts }) => ({
      contacts: [user, ...contacts]
    }));
  }

  handleDeleteUser = (idUser) => {
    this.setState(({contacts}) => ({
      contacts: contacts.filter(({id}) => idUser !== id),
    }));
  }

  render() {
    return (
      <>
        <h1>Phonebook</h1>
        <ContactForm onAddUser={this.handleAddUser} />

        <h2>Contacts</h2>
        <Filter onFilter={this.handleFilter}/>
        <ContactList visibleList={this.getVisibleItems()} onDeleteUser={this.handleDeleteUser}/>
      </>
    );
  }
};
