import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function HeaderComidas() {
  return (
    <div>
      <header>
        <Link to="/perfil">
          <img src={ profileIcon } alt="ProfileIcon" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">Comidas</h1>
        <button
          type="button"
          data-testid="search-top-btn"
        >
          <img src={ searchIcon } alt="Search" />

        </button>
      </header>
    </div>
  );
}

export default HeaderComidas;
