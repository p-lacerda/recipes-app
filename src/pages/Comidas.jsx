import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Comidas() {
  return (
    <div>
      <Header title="Comidas" withSearchButton data-testid="page-title" />
    
      { window.location.pathname === '/comidas' && <Footer /> }
    </div>

  );
}

export default Comidas;
