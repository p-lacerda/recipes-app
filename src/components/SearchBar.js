import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { drinksByName } from '../redux/actions';
import getApis from '../services/APIs';

const SearchBar = (props) => {
  const [search, setSearch] = useState({ text: '', filter: 'ingredient' });
  const history = useHistory();
  const { drinksInfoByName } = props;

  const handleInput = ({ target: { name, value } }) => (
    setSearch({ ...search, [name]: value })
  );

  const searchWithFilter = (letter, type, pathname, searchText) => {
    if (window.location.pathname.includes(pathname)) {
      getApis(`https://www.the${type}db.com/api/json/v1/1/filter.php?${letter}=${searchText}`);
    }
  };

  const MAX_SHOWN_CARDS = 12;

  const handleClick = () => {
    switch (search.filter) {
    case 'ingredient':
      searchWithFilter('i', 'meal', '/comidas', search.text);
      searchWithFilter('i', 'cocktail', '/bebidas', search.text);
      break;
    case 'name':
      if (window.location.pathname.includes('/comidas')) {
        getApis(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search.text}`)
          .then(({ meals }) => {
            if (meals.length === 1) { history.push(`/comidas/${meals[0].idMeal}`); }
            const filteredMealsArray = meals.length > MAX_SHOWN_CARDS ? meals.splice(0, MAX_SHOWN_CARDS) : meals;
            // dispatch de filteredMealsArray (array com 12 primeiros itens a serem mostrados como cards)
          });
      }
      if (window.location.pathname.includes('/bebidas')) {
        getApis(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search.text}`)
          .then(({ drinks }) => {
            if (drinks.length === 1) { history.push(`/bebidas/${drinks[0].idDrink}`); }
            const filteredDrinksArray = drinks.length > MAX_SHOWN_CARDS ? drinks.splice(0, MAX_SHOWN_CARDS) : drinks;
            // dispatch de filteredMealsArray (array com 12 primeiros itens a serem mostrados como cards)
            drinksInfoByName({ drinks: filteredDrinksArray });
          });
      }
      break;
    default:
      if (search.text.length > 1) {
        window.alert('Sua busca deve conter somente 1 (um) caracter');
      }
      if (window.location.pathname.includes('/comidas')) {
        getApis(`https://www.themealdb.com/api/json/v1/1/search.php?f=${search.text}`)
          .then((response) => console.log(response)); // Colocar para a store, para ser mostrada na tela
      }
      if (window.location.pathname.includes('/bebidas')) {
        getApis(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${search.text}`)
          .then((response) => console.log(response)); // Colocar para a store, para ser mostrada na tela
      }
      break;
    }
  };

  return (
    <section className="section-container">
      <div>
        <input
          type="text"
          name="text"
          data-testid="search-input"
          onChange={ handleInput }
        />

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleClick }
        >
          Buscar
        </button>
      </div>
      <div className="radios">
        <label htmlFor="ingredient-search">
          <input
            data-testid="ingredient-search-radio"
            name="filter"
            type="radio"
            value="ingredient"
            onChange={ handleInput }
          />
          Ingrediente
        </label>

        <label htmlFor="name-search">
          <input
            data-testid="name-search-radio"
            id="search-name"
            name="filter"
            onChange={ handleInput }
            type="radio"
            value="name"
          />
          Nome
        </label>

        <label htmlFor="first-letter-search">
          <input
            data-testid="first-letter-search-radio"
            name="filter"
            onChange={ handleInput }
            type="radio"
            value="first-letter"
          />
          Primeira letra
        </label>
      </div>
    </section>
  );
};
SearchBar.propTypes = {
  drinksInfoByName: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  drinksInfoByName: (response) => dispatch(drinksByName(response)),
});

export default connect(null, mapDispatchToProps)(SearchBar);
