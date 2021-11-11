import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      { checkHeader() }
      <p>Explorar</p>

      <Footer />
    </div>
  );
}

export default Explorar;
