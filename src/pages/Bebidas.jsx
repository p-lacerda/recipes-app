import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import { drinksThunk } from '../redux/actions';
import Filtros from '../components/FIltros';

function Bebidas(props) {
  const { drinks } = props;
  const NUM_INDEX_MAX = 12;
  const arrFilts = [
    'Ordinary Drink', 'Cocktail', 'Milk / Float / Shake', 'Other/Unknown', 'Cocoa'];

  useEffect(() => {
    const { drinksInfo } = props;
    drinksInfo();
  }, []);

  return (
    <section>
      <Filtros filts={ arrFilts } />
      {drinks
        && drinks.drinks.map((meal, index) => (
          index < NUM_INDEX_MAX
          && <Card
            index={ index }
            img={ meal.strDrinkThumb }
            title={ meal.strDrink }
            key={ meal.strDrink }
          />
        )) }
    </section>
  );
}

Bebidas.propTypes = {
  drinksInfo: PropTypes.func.isRequired,
  drinks: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  drinks: state.drinksReducer.response,
});

const mapDispatchToProps = (dispatch) => ({
  drinksInfo: () => dispatch(drinksThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Bebidas);
