import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './css/Header.css';
import SearchBar from './SearchBar';

const Header = ({ title, withSearchButton }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <>
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
        </div>
      </header>
      {showSearch && <SearchBar />}
    </>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  withSearchButton: PropTypes.bool.isRequired,
};

export default Header;
