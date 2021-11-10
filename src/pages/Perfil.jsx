import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  return (
    <div>
      <Header title="Perfil" withSearchButton={ false } />
      <Footer />
    </div>
  );
}

export default Perfil;
