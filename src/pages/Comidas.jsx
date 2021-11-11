import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { mealsThunk } from '../redux/actions';
import Card from '../components/Card';
import Header from '../components/Header';
import FiltrosMeal from '../components/FiltroMeal';
import Footer from '../components/Footer';

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
      { window.location.pathname === '/comidas'
      && <Header title="Comidas" withSearchButton data-testid="page-title" /> }

      {mealsFit
      && <FiltrosMeal
        filts={ arrFilts }
        setRecipe={ setMealsFit }
        recipe={ mealsFit.meals }
        allRecipe={ meals }
      />}
      <div>
        { mealsFit && mealsFit.meals.map((meal, index) => (
          index < NUM_INDEX_MAX
          && (
            <Link to={ `/comidas/${meal.idMeal}` }>
              <Card
                index={ index }
                img={ meal.strMealThumb }
                title={ meal.strMeal }
                key={ meal.strMeal }
              />
            </Link>)

        )) }
      </div>

      { window.location.pathname === '/comidas' && <Footer /> }
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
