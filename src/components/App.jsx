import { Component } from 'react';
import { AddContact } from './AddContact/AddContact';
import { Contacts } from './Contacts/Contacts';
import { FilterContact } from './FilterContact/FilterContact';

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

componentDidMount(){
  const savedContacts = localStorage.getItem("Contacts")
  console.log(savedContacts);
  if (savedContacts) {
    this.setState({contacts: JSON.parse(savedContacts)})
  }
}
componentDidUpdate(prevProps,prevState){
  if (prevState.contacts !== this.state.contacts) {
     localStorage.setItem("Contacts", JSON.stringify(this.state.contacts))
  }
 
}
  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  addContact = newContact => {
    const { contacts } = this.state;

    const isDuplicate = contacts.some(
      c => c.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (isDuplicate) {
      alert(`${newContact.name} имя уже добавлено.`);
      return;
    }

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div style={{ marginLeft: '10px' }}>
        <h1>Phonebook</h1>
        <AddContact onSubmit={this.addContact} />

        <h2>Contacts</h2>
        <FilterContact value={filter} onChange={this.handleInputChange} />
        <Contacts
          contacts={visibleContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
