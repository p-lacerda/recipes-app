import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setCheckLocalStorageMeals,
  verifyDisableButtonComidas } from '../services/localStorage';
import './css/Checkbox.css';

function Checkbox(props) {
  const [checked, setChecked] = useState(false);
  const { ingredient, index, id, setDisabled } = props;

  const verifyCheck = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.meals[id]) {
      const newProgressRecipe = inProgressRecipes.meals[id].filter((ingrediente) => (
        ingredient === ingrediente
      ));
      if (newProgressRecipe.length === 0) {
        setChecked(true);
      }
    }
  };

  const handleChangeCheckbox = async () => {
    // const { handleChange, ingredient } = props;
    // handleChange(!checked, ingredient);
    await setChecked(!checked);
    setCheckLocalStorageMeals(!checked, id, ingredient);
    verifyDisableButtonComidas(setDisabled, id);
  };

  useEffect(() => {
    verifyCheck();
  }, []);

  return (
    <div>
      {ingredient
      && (
        <p
          data-testid={ `${index}-ingredient-step` }
          className={ checked ? 'checked' : '' }
        >
          {ingredient}
          <input
            value={ ingredient }
            type="checkbox"
            id={ index }
            checked={ checked }
            onChange={ handleChangeCheckbox }
          />
        </p>)}
    </div>
  );
}

Checkbox.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  setDisabled: PropTypes.func.isRequired,
};

export default Checkbox;
