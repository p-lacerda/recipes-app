import React from 'react';

const RecipesDoneCard = (src, index) => (
  <div>
    <img src={ src } alt='' data-testid={ `${index}-horizontal-image` } />
    <p data-testid={ `${index}-horizontal-top-text` }>
      Categoria
    </p>
    <p data-testid={ `${index}-horizontal-name` }>
      {/* { recipe } */}
    </p>
    <p data-testid={ `${index}-horizontal-done-date` }>
      Data
    </p>
  </div>
);

export default RecipesDoneCard;
