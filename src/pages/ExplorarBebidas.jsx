import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  return (
    <div>
      { window.location.pathname === '/explorar/bebidas'
      && <Header title="Explorar Bebidas" data-testid="page-title" /> }

      <p>ExplorarBebidas</p>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
