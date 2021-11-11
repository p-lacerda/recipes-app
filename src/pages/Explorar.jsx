import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Explore from '../components/explore';

function Explorar() {
  const checkHeader = () => {
    switch (window.location.pathname) {
    case '/explorar/comidas':
      return <Header title="Explorar Comidas" data-testid="page-title" />;
    case '/explorar/bebidas':
      return <Header title="Explorar Bebidas" data-testid="page-title" />;
    case '/explorar/comidas/ingredientes':
      return <Header title="Explorar Ingredientes" data-testid="page-title" />;
    case '/explorar/bebidas/ingredientes':
      return <Header title="Explorar Ingredientes" data-testid="page-title" />;
    case '/explorar/comidas/area':
      return <Header title="Explorar Origem" withSearchButton data-testid="page-title" />;
    default:
      return <Header title="Explorar" data-testid="page-title" />;
    }
  };

  return (
    <div>
      <Header title="Explorar" withSearchButton={ false } />
      <Explore />
      { checkHeader() }
      <Footer />
    </div>
  );
}

export default Explorar;
