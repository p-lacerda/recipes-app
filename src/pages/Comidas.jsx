import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { mealsThunk } from '../redux/actions';
import Card from '../components/Card';
import HeaderComidas from '../components/HeaderComidas';
import Filtros from '../components/FIltros';
import { generatesFilters } from '../services/APIs';

function Comidas(props) {
  const { meals } = props;
  const NUM_INDEX_MAX = 12;

  useEffect(() => {
    const { mealsInfo } = props;
    mealsInfo();
  }, []);

  return (
    <section>
      <HeaderComidas />
      <div>
        { meals && meals.meals.map((meal, index) => (
          index < NUM_INDEX_MAX
          && <Card
            index={ index }
            img={ meal.strMealThumb }
            title={ meal.strMeal }
            key={ meal.strMeal }
          />)) }
        {meals
        && <Filtros meals={ () => generatesFilters(meals.meals) } />}
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
