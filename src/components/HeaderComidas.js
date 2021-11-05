import React from 'react';
import { Link } from 'react-router-dom';

function HeaderComidas() {
  return (
    <div>
      <header>
        <Link to="/perfil" data-testid="profile-top-btn">
          <button type="button">
            <img alt="profile" src="src/images/profileIcon.svg" />
          </button>
        </Link>
        <h1 data-testid="page-title">Comidas</h1>
        <button type="button" data-testid="search-top-btn">Pesquisa</button>
      </header>
    </div>
  );
}

export default HeaderComidas;
