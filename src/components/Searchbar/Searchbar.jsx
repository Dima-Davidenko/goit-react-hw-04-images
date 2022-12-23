import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { notify } from '../../utils/notify';

const Searchbar = ({ setImageQuery }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = ({ currentTarget }) => {
    const normalizedInput = currentTarget.value;
    setInputValue(normalizedInput);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const normalizedInputValue = inputValue.trim();
    if (!normalizedInputValue) {
      notify("Shoudn't be empty");
    } else {
      setImageQuery(normalizedInputValue);
    }
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="button-label"></span>
        </button>

        <input
          className="SearchForm-input"
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={inputValue}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  setImageQuery: PropTypes.func.isRequired,
};

export default Searchbar;
