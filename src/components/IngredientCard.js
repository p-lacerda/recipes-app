import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard(props) {
  const { name, index, type } = props;
  const url = type === 'comida' ? `https://www.themealdb.com/images/ingredients/${name}-Small.png`
    : `https://www.thecocktaildb.com/images/ingredients/${name}-Small.png`;
  return (
    <div data-testid={ `${index}-ingredient-card` }>
      <h3 data-testid={ `${index}-card-name` }>{name}</h3>
      <img
        src={ url }
        alt="ingrediente"
        data-testid={ `${index}-card-img` }
      />
    </div>
  );
}

IngredientCard.propTypes = {
  name: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientCard;
