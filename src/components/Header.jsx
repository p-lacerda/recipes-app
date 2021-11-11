import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './css/Header.css';

const Header = ({ title, withSearchButton }) => {
  const [showSearch, setShowSearch] = useState(false);

  const handleSearch = ({ target }) => {
    console.log(target);
  };

  return (
    <header>
      <Link to="/perfil">
        <img
          src={ profileIcon }
          alt="ProfileIcon"
          data-testid="profile-top-btn"
        />
      </Link>

      <h3 data-testid="page-title">{ title }</h3>

      <div className="search">
        {withSearchButton && (
          <button type="button" onClick={ () => setShowSearch(!showSearch) }>
            <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
          </button>
        )}
        {showSearch && (
          <input
            type="text"
            name="search"
            data-testid="search-input"
            onChange={ handleSearch }
          />
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  withSearchButton: PropTypes.bool.isRequired,
};

export default Header;
