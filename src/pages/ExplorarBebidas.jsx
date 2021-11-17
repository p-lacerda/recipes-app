import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarBebidas() {
  const [surpriseDrink, setSurpriseDrink] = useState(0);

  useEffect(() => {
    const getRandomDrink = async () => {
      const response = await
      fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((res) => res.json());
      return setSurpriseDrink(response.drinks[0].idDrink);
    };
    getRandomDrink();
  }, []);

  const randomId = surpriseDrink;

  function random() {
    if (randomId > 0) {
      return (
        <Link to={ `/bebidas/${randomId}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            name="Me Surpreenda!"
          >
            Me Surpreenda!
          </button>
        </Link>);
    }
    return <p>Loading...</p>;
  }

  return (
    <div>
      {window.location.pathname === '/explorar/bebidas'
        && <Header title="Explorar Bebidas" data-testid="page-title" />}

      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          {' '}
          Por Ingredientes
        </button>
      </Link>
      {random()}
      <Footer />
    </div>
  );
}

export default ExplorarBebidas;
