export const Contacts = ({ contacts,    deleteContact }) => {
  return (
    <section>
      <h3>Contacts</h3>
      <ul>
        {contacts.map(contact => (
          <li key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={()=> deleteContact(contact.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
