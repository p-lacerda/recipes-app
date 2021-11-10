import React from 'react';
import Input from './Input';

const SeachBar = () => {
  const handleSearch = ({ target }) => {
    console.log(target);
  };

  return (
    <Input name="search" data-testid="search-input" onChange={ handleSearch } />
  );
};

export default SeachBar;
