import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas() {
  return (
    <div data-testid="page-title">
      <Header />
      <p>Bebidas</p>
    
      { window.location.pathname === '/bebidas' && <Footer /> }    
    </div>
  );
}

export default Bebidas;
