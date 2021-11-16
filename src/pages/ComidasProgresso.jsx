import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mealsThunkById } from '../redux/actions';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import CheckboxComidas from '../components/CheckboxComidas';
import { initValues, verifyDisableButtonComidas } from '../services/localStorage';

function ComidasProgresso(props) {
  const { mealsInfoById, mealsById } = props;
  const { match: { params: { id } } } = props;
  const { match: { url } } = props;
  const TIME_OUT = 5000;
  const [linkCopy, setLinkCopy] = useState('no');
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const [disabled, setDisabled] = useState(true);
  const ingredients = [];

  const verifyFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorites !== undefined) {
      const filtraFavoID = favorites.filter((favorite) => favorite.id === String(id));
      if (filtraFavoID.length > 0) {
        setHeartIcon(blackHeartIcon);
      }
    }
  };

  const favoriteFunction = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== undefined) {
      const favoriteSave = favoriteRecipes.filter(
        (favorite) => favorite.id === String(id),
      );
      if (favoriteSave.length === 0) {
        favoriteRecipes = [
          {
            id,
            type: 'comida',
            area: mealsById.response.meals[0].strArea,
            category: mealsById.response.meals[0].strCategory,
            alcoholicOrNot: '',
            name: mealsById.response.meals[0].strMeal,
            image: mealsById.response.meals[0].strMealThumb,
          },
          ...favoriteRecipes,
        ];
        localStorage.favoriteRecipes = JSON.stringify(favoriteRecipes);
      } else {
        favoriteRecipes.splice(favoriteSave[0], 1);
        localStorage.favoriteRecipes = JSON.stringify(favoriteRecipes);
      }
      if (heartIcon === whiteHeartIcon) {
        setHeartIcon(blackHeartIcon);
      } else {
        setHeartIcon(whiteHeartIcon);
      }
    }
  };
  useEffect(() => {
    initValues();
    mealsInfoById(id);
    verifyFavorite();
    verifyDisableButtonComidas(setDisabled, id);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setLinkCopy('no');
    }, TIME_OUT);
  }, [linkCopy]);

  const generateIngredients = () => {
    const NUM_INGREDIENTS = 15;
    const meals = mealsById.response.meals[0];
    for (let i = 1; i < NUM_INGREDIENTS; i += 1) {
      if (meals[`strIngredient${i}`] !== null
      && meals[`strIngredient${i}`].length > 0) {
        ingredients.push([meals[`strIngredient${i}`], [meals[`strMeasure${i}`]]]);
      }
    }

    return ingredients.map((ingredient, ind) => (
      <CheckboxComidas
        setDisabled={ setDisabled }
        id={ id }
        index={ ind }
        key={ ingredient }
        ingredient={ `${ingredient[0]} ${ingredient[1]}` }
      />));
  };
  return (
    <>
      <p>ComidasProgresso</p>
      {mealsById && mealsById.response.meals
     && (
       <>
         <img
           src={ mealsById.response.meals[0].strMealThumb }
           alt="imagem receita bebida"
           data-testid="recipe-photo"
         />
         <h3 data-testid="recipe-title">{mealsById.response.meals[0].strMeals}</h3>
         <button
           type="button"
           data-testid="share-btn"
           // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
           // Gary Vernon Grubb
           onClick={ () => {
             window.navigator.clipboard.writeText(`http://localhost:3000${url.replace('/in-progress', '')}`);
             setLinkCopy('Link copiado!');
           } }
         >
           <img src={ ShareIcon } alt="Compartilhar" />
         </button>
         <button
           type="button"
           data-testid="favorite-btn"
           onClick={ () => favoriteFunction() }
           src={ heartIcon }
         >
           <img src={ heartIcon } alt="favoritar" />
         </button>
         {linkCopy === 'Link copiado!' && <p>{linkCopy}</p>}
         <h3 data-testid="recipe-category">
           {mealsById.response.meals[0].strCategory}
         </h3>
         <h3> Ingredientes </h3>
         {generateIngredients()}
         <h3> Instruções </h3>
         <p data-testid="instructions">
           { mealsById.response.meals[0].strInstructions }
         </p>
         <button
           type="button"
           data-testid="finish-recipe-btn"
           disabled={ disabled }
         >
           Finalizar Receita

         </button>
       </>
     )}
    </>
  );
}

ComidasProgresso.propTypes = {
  mealsInfoById: PropTypes.func.isRequired,
  mealsById: PropTypes.arrayOf(PropTypes.any).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = (state) => ({
  mealsById: state.mealsReducer.mealsInfoByID,
});

const mapDispatchToProps = (dispatch) => ({
  mealsInfoById: (id) => dispatch(mealsThunkById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComidasProgresso);
