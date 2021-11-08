import React from 'react';
import Footer from '../components/Footer';
import HeaderComidas from '../components/HeaderComidas';

function Comidas() {
  console.log();

  return (
    <div>
      <HeaderComidas />

      { window.location.pathname === '/comidas' && <Footer /> }
    </div>

  );
}

export default Comidas;
