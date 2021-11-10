import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  return (
    <div>
      <Header title="Explorar Bebidas" withSearchButton={ false } />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          {' '}
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
