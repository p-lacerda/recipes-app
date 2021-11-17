import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidas() {
  const [surpriseMeal, setSurpriseMeal] = useState(0);

  useEffect(() => {
    const getRandomMeal = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php').then((res) => res.json());
      return setSurpriseMeal(response.meals[0].idMeal);
    };
    getRandomMeal();
  }, []);

  const randomId = surpriseMeal;

  function random() {
    if (randomId > 0) {
      return (
        <Link to={ `/comidas/${randomId}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            name="Me Surpreenda!"
          >
            Me Surpreenda!
          </button>
        </Link>
      );
    }
  }
  return (
    <div>
      <Header title="Explorar Comidas" withSearchButton={ false } />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      {random()}
      <Footer />
    </div>

  );
}

export default ExplorarComidas;
