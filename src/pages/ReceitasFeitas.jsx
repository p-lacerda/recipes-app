import React from 'react';
import Header from '../components/Header';
import RecipesDoneCard from '../components/RecipesDoneCard';

const ReceitasFeitas = () => (
  <div>
    <Header title="Receitas Feitas" withSearchButton={ false } />
    <button type="button" data-testid="filter-by-all-btn">All</button>
    <button type="button" data-testid="filter-by-food-btn">Food</button>
    <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
    <RecipesDoneCard />
  </div>
);

export default ReceitasFeitas;
