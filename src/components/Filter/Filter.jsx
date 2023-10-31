import React from 'react';
import PropTypes from 'prop-types';
import { FilterInput } from './Filter.styled';

const Filter = ({ filteredContacts }) => {
  return (
    <FilterInput
      name="filter"
      onChange={filteredContacts}
      placeholder="Find contact by name"
    />
  );
};

Filter.propTypes = {
  filteredContacts: PropTypes.func.isRequired,
};

export default Filter;