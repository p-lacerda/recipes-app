import React from 'react';
import PropTypes from 'prop-types';
import './css/Card.css';

const Button = ({ img, title, index }) => (
  <div className="card" data-testid={ `${index}-recipe-card` }>
    <img src={ img } alt={ title } data-testid={ `${index}-card-img` } />
    <div className="card-title">
      <h3 data-testid={ `${index}-card-name` }>
        { title }
      </h3>
    </div>
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
