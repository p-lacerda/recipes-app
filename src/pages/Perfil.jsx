import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const history = useHistory();
  const playerEmail = JSON.parse(localStorage.getItem('user')).email;

  const onClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <h1 data-testid="page-title">Perfil</h1>
      <div>
        <p data-testid="profile-email">{ playerEmail }</p>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ onClick }
        >
          Sair
        </button>
        <Footer />
      </div>
    </>
  );
}

export default Perfil;
