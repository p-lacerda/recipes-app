import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas() {
  return (
    <div>
      { window.location.pathname === '/bebidas'
      && <Header title="Bebidas" withSearchButton data-testid="page-title" /> }

      <p>Bebidas</p>

      { window.location.pathname === '/bebidas' && <Footer /> }
    </div>
  );
}

export default Bebidas;
