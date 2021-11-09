import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Filtros(props) {
  const { filts, setRecipe, recipe, allRecipe } = props;
  const [category, setCategory] = useState('');

  const handleClick = (filt) => {
    const lastMeal = [...recipe];

    if (filt !== category) {
      const newMeals = lastMeal.filter((meal) => meal.strCategory === `${filt}`);
      setRecipe(allRecipe.meals ? { meals: newMeals } : { drinks: newMeals });
      setCategory(filt);
    } else {
      setRecipe(allRecipe);
      setCategory('');
    }
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
  setRecipe: PropTypes.func.isRequired,
  recipe: PropTypes.arrayOf(PropTypes.any).isRequired,
  allRecipe: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default Filtros;
