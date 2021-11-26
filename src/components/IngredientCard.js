import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { drinksByIngredients, blockDrinksThunk } from '../redux/actions';

function IngredientCard(props) {
  const { name, index, type, drinksInfoByIngredients, blockDrink } = props;
  const url = type === 'comida' ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;

  const history = useHistory();

  return (
    <button
      type="button"
      data-testid={ `${index}-ingredient-card` }
      onClick={ () => {
        blockDrink(true);
        drinksInfoByIngredients(name.split(' ').join('_'));
        history.push('/bebidas');
      } }
    >
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
      <img
        src={ url }
        alt="ingrediente"
        data-testid={ `${index}-card-img` }
      />
    </button>
  );
}

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  drinksInfoByIngredients: PropTypes.func.isRequired,
  blockDrink: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  drinksInfoByIngredients: (name) => dispatch(drinksByIngredients(name)),
  blockDrink: (comp) => dispatch(blockDrinksThunk(comp)),
});

export default connect(null, mapDispatchToProps)(IngredientCard);
