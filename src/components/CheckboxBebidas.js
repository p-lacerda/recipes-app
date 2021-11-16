import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { setCheckLocalStorage } from '../services/localStorage';
import './css/Checkbox.css';

function CheckboxComidas(props) {
  const [checked, setChecked] = useState(false);
  const { ingredient, index, id } = props;

  const verifyCheck = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.cocktails[id]) {
      const newProgressRecipe = inProgressRecipes.cocktails[id].filter((ingrediente) => (
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
    setCheckLocalStorage(!checked, id, ingredient);
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

CheckboxComidas.propTypes = {
  ingredient: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
//   handleChange: PropTypes.func.isRequired,
};

export default CheckboxComidas;
