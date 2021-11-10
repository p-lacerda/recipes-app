import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ img, title, index }) => (

  <div data-testid={ `${index}-recipe-card` }>
    <img src={ img } alt={ title } data-testid={ `${index}-card-img` } />
    <h3 data-testid={ `${index}-card-name` }>
      { title }
    </h3>
  </div>

);

Button.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

// strMealThumb
// strDrinkThumb
// strMeal
// strDrink
export default Button;
