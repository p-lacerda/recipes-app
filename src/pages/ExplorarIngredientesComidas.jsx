import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarIngredientesComidas() {
  return (
    <div>
      <Header title="Explorar Ingredientes" withSearchButton={ false } />
      <Footer />
    </div>
  );
}

export default ExplorarIngredientesComidas;
