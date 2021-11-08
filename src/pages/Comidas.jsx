import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mealsThunk } from '../redux/actions';
import Card from '../components/Card';
import HeaderComidas from '../components/HeaderComidas';
import Filtros from '../components/FIltros';

function Comidas(props) {
  const { meals } = props;
  const NUM_INDEX_MAX = 12;
  const arrFilts = ['Beef', 'Breakfast', 'Chicken', 'Dessert', 'Goat'];
  const [mealsFit, setMealsFit] = useState(meals);

  useEffect(() => {
    const { mealsInfo } = props;
    mealsInfo();
  }, []);

  useEffect(() => {
    setMealsFit(meals);
  }, [meals]);

  return (
    <section>
      <HeaderComidas />
      {mealsFit
      && <Filtros filts={ arrFilts } setMealsFit={ setMealsFit } mealsFit={ mealsFit } />}
      <div>
        { mealsFit && mealsFit.meals.map((meal, index) => (
          index < NUM_INDEX_MAX
          && <Card
            index={ index }
            img={ meal.strMealThumb }
            title={ meal.strMeal }
            key={ meal.strMeal }
          />)) }

      </div>
    </section>

  );
}

Comidas.propTypes = {
  mealsInfo: PropTypes.func.isRequired,
  meals: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  meals: state.mealsReducer.response,
});

const mapDispatchToProps = (dispatch) => ({
  mealsInfo: () => dispatch(mealsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comidas);
