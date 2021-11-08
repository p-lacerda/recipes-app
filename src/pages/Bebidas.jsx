import React from 'react';
import Footer from '../components/Footer';

function Bebidas() {
  return (
    <div>
      <p>Bebidas</p>

      { window.location.pathname === '/bebidas' && <Footer /> }
    </div>
  );
}

export default Bebidas;
