import React from 'react';
import PropTypes from 'prop-types';
import { List, Item, Text, Button } from './ContactList.styled';

const ContactList = ({ list, onDeleteContact }) => {
  return (
    <List>
      {list.map(contact => (
        <Item key={contact.id}>
          <Text>
            {contact.name}: {contact.number}
          </Text>
          <Button onClick={() => onDeleteContact(contact.id)}>Delete</Button>
        </Item>
      ))}
    </List>
  );
};

ContactList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
export default ContactList;