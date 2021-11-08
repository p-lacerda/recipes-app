import React from 'react';
import PropTypes from 'prop-types';

function Filtros(props) {
  const { filts, setMealsFit, mealsFit } = props;
  console.log(filts);
  console.log(mealsFit);

  const handleClick = (filt) => {
    const lastMeal = { ...mealsFit };
    const newMeals = lastMeal.meals.filter((meal) => meal.strCategory === `${filt}`);
    console.log(newMeals);
  };

  return (
    <div>
      { filts.map((filt) => (
        <button
          data-testid={ `${filt}-category-filter` }
          key={ filt }
          type="button"
          onClick={ () => handleClick(filt) }
        >
          {filt}
        </button>))}
    </div>
  );
}

Filtros.propTypes = {
  filts: PropTypes.arrayOf(PropTypes.string).isRequired,
  setMealsFit: PropTypes.func.isRequired,
  mealsFit: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Filtros;
