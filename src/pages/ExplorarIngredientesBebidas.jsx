import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { drinksIngredients } from '../redux/actions';
import IngredientCard from '../components/IngredientCard';

function ExplorarIngredientesBebidas(props) {
  const { getDrinksIngredients, drinksIngredientsProps } = props;
  const MAX_NUMBER_CARDS = 12;

  useEffect(() => {
    getDrinksIngredients();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" withSearchButton={ false } />
      <Footer />
      {drinksIngredientsProps
      && drinksIngredientsProps.map((ingredient, index) => (
        index < MAX_NUMBER_CARDS
        && (<IngredientCard
          key={ ingredient.idIngredient1 }
          name={ ingredient.strIngredient1 }
          index={ index }
        />
        )
      ))}
    </div>
  );
}

ExplorarIngredientesBebidas.propTypes = {
  getDrinksIngredients: PropTypes.func.isRequired,
  drinksIngredientsProps: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  drinksIngredientsProps: state.IngredientsReducer.ingredients.response,
});

const mapDispatchToProps = (dispatch) => ({
  getDrinksIngredients: () => dispatch(drinksIngredients()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExplorarIngredientesBebidas);
