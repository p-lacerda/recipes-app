import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { mealsIngredients } from '../redux/actions';
import IngredientCard from '../components/IngredientCard';

function ExplorarIngredientesComidas(props) {
  const { getMealsIngredients, mealsIngredientsProps } = props;
  const MAX_NUMBER_CARDS = 12;

  useEffect(() => {
    getMealsIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" withSearchButton={ false } />
      <Footer />
      {mealsIngredientsProps
      && mealsIngredientsProps.map((ingredient, index) => (
        index < MAX_NUMBER_CARDS
        && (<IngredientCard
          key={ ingredient.idIngredient }
          name={ ingredient.strIngredient }
          index={ index }
          type="comida"
        />
        )
      ))}
    </div>
  );
}

ExplorarIngredientesComidas.propTypes = {
  getMealsIngredients: PropTypes.func.isRequired,
  mealsIngredientsProps: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  mealsIngredientsProps: state.IngredientsReducer.ingredients.response,
});

const mapDispatchToProps = (dispatch) => ({
  getMealsIngredients: () => dispatch(mealsIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarIngredientesComidas);
