import PropTypes from 'prop-types';
import css from './Contacts.module.css';

export const Contacts = ({ allContacts, removeContact }) => {
  return (
    <div className={css.contacts}>
      <ul className={css.contactsList}>
        {allContacts.map(contact => (
          <li key={contact.id} className={css.contactListItem}>
            <p className={css.contact}>
              {contact.name} : {contact.number}
            </p>
            <button
              className={css.contactDeleteBtn}
              onClick={() => removeContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

Contacts.propTypes = {
  allContacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  removeContact: PropTypes.func.isRequired,
};
