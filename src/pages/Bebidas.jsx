import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import { drinksThunk } from '../redux/actions';
import FiltrosDrink from '../components/FiltroDrink';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Bebidas(props) {
  const { drinks } = props;
  const NUM_INDEX_MAX = 12;
  const arrFilts = [
    'Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other/Unknown', 'Cocoa'];
  const [drinksFilt, setDrinksFilt] = useState(drinks);

  useEffect(() => {
    const { drinksInfo } = props;
    drinksInfo();
  }, []);

  useEffect(() => {
    setDrinksFilt(drinks);
    console.log('oi');
  }, [drinks]);

  return (
    <div data-testid="page-title">
      { window.location.pathname === '/bebidas'
      && <Header title="Bebidas" withSearchButton data-testid="page-title" /> }

      <section>
        {drinksFilt
        && <FiltrosDrink
          filts={ arrFilts }
          setRecipe={ setDrinksFilt }
          recipe={ drinksFilt.drinks }
          allRecipe={ drinks }
        />}
        { drinksFilt
          && drinksFilt.drinks.map((drink, index) => (
            index < NUM_INDEX_MAX
            && (
              <Link to={ `/bebidas/${drink.idDrink}` }>
                <Card
                  index={ index }
                  img={ drink.strDrinkThumb }
                  title={ drink.strDrink }
                  key={ drink.strDrink }
                />
              </Link>

            )
          )) }
      </section>
      { window.location.pathname === '/bebidas' && <Footer /> }
    </div>
  );
}

Bebidas.propTypes = {
  drinksInfo: PropTypes.func.isRequired,
  drinks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  drinks: state.drinksReducer.drinksRedu.response,
});

const mapDispatchToProps = (dispatch) => ({
  drinksInfo: () => dispatch(drinksThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);
