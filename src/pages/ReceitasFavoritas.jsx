import React, { useState } from 'react';
import Header from '../components/Header';
import RecipesFavoritesCard from '../components/RecipesFavoritesCard';

function ReceitasFavoritas() {
  const doneRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [filteredRecipes, setFilterRecipes] = useState(doneRecipes);

  const filterFood = () => {
    const doneFilterRecipes = doneRecipes.filter((recipe) => recipe.type === 'comida');
    setFilterRecipes(doneFilterRecipes);
  };

  const filterDrink = () => {
    const doneFilterRecipes = doneRecipes.filter((recipe) => recipe.type === 'bebida');
    setFilterRecipes(doneFilterRecipes);
  };

  const filterAll = () => {
    setFilterRecipes(doneRecipes);
  };

  return (
    <div>
      <Header title="Receitas Favoritas" withSearchButton={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterAll() }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterFood() }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterDrink() }
      >
        Drinks
      </button>
      { filteredRecipes && filteredRecipes.map((recipe, index) => (
        <RecipesFavoritesCard
          alcoholic={ recipe.alcoholicOrNot }
          type={ recipe.type }
          key={ recipe.id }
          index={ index }
          name={ recipe.name }
          src={ recipe.image }
          category={ recipe.category }
          date={ recipe.doneDate }
          tags={ recipe.tags }
          area={ recipe.area }
          id={ recipe.id }
        />
      ))}
    </div>
  );
}

export default ReceitasFavoritas;
