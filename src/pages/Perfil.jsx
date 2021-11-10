import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  return (
    <div>
      <Header title="Perfil" data-testid="page-title" />

      <h1 data-testid="page-title">Perfil</h1>
      <p>Perfil</p>
      <Footer />
    </div>
  );
}

export default Perfil;
