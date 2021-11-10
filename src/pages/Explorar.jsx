import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Explore from '../components/explore';

function Explorar() {
  return (
    <div>
      <Header title="Explorar" withSearchButton={ false } />
      <Explore />
      <Footer />
    </div>
  );
}

export default Explorar;
