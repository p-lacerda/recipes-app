import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({ title, withSearchButton }) {
  const [showSearch, setShowSearch] = useState(false);

  const handleChangeButton = () => {
    if (showSearch) {
      setShowSearch(false);
    } else {
      setShowSearch(true);
    }
  };
  return (
    <div>
      <header>
        <Link to="/perfil">
          <img src={ profileIcon } alt="ProfileIcon" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{title}</h1>
        <div>
          {withSearchButton && (
            <button
              type="button"
              onClick={ handleChangeButton }
            >
              <img src={ searchIcon } alt="Search" data-testid="search-top-btn" />
            </button>
          )}
          {showSearch && <SearchBar />}
        </div>
      </header>
    </div>
  );
}
Header.propTypes = {
  title: PropTypes.string.isRequired,
  withSearchButton: PropTypes.bool.isRequired,
};

export default Header;
