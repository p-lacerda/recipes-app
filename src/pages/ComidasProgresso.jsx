import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { mealsThunkById } from '../redux/actions';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import CheckboxComidas from '../components/CheckboxComidas';
import { initValues,
  verifyDisableButtonComidas, verifyFavorite } from '../services/localStorage';
import '../components/css/Checkbox.css';

function ComidasProgresso(props) {
  const { mealsInfoById, mealsById } = props;
  const { match: { params: { id } } } = props;
  const { match: { url } } = props;
  const TIME_OUT = 5000;
  const [linkCopy, setLinkCopy] = useState('no');
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const [disabled, setDisabled] = useState(true);
  const ingredients = [];
  const history = useHistory();

  const verifyInitLocal = () => {
    const localInProgressive = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (disabled === true && localInProgressive.meals
      && Object.keys(localInProgressive.meals).length === 0
    && mealsById !== undefined) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      inProgressRecipes.meals = {
        ...inProgressRecipes.meals,
        [id]: ingredients,
      };
      localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
    }
  };

  // console.log(`${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`);

  const finishFunction = () => {
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes !== undefined) {
      const doneSave = doneRecipes.filter(
        (done) => done.id === String(id),
      );
      if (doneSave && doneSave.length === 0) {
        doneRecipes = [{
          id,
          type: 'comida',
          area: mealsById.response.meals[0].strArea,
          category: mealsById.response.meals[0].strCategory,
          alcoholicOrNot: '',
          name: mealsById.response.meals[0].strMeal,
          image: mealsById.response.meals[0].strMealThumb,
          doneDate: '',
          tags: '',
        },
        ...doneRecipes,
        ];
        localStorage.doneRecipes = JSON.stringify(doneRecipes);
      } else {
        doneRecipes.splice(doneSave[0], 1);
        localStorage.doneRecipes = JSON.stringify(doneRecipes);
      }
    }
    localStorage.doneRecipes = JSON.stringify(doneRecipes);
    history.push('/receitas-feitas');
  };

  const favoriteFunction = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes !== undefined) {
      const favoriteSave = favoriteRecipes.filter(
        (favorite) => favorite.id === String(id),
      );
      if (favoriteSave && favoriteSave.length === 0) {
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
    verifyFavorite(id, setHeartIcon, blackHeartIcon);
    verifyDisableButtonComidas(setDisabled, id);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setLinkCopy('no');
    }, TIME_OUT);
  }, [linkCopy]);

  useEffect(() => {
    verifyInitLocal();
  }, [mealsById]);

  const generateIngredients = () => {
    const NUM_INGREDIENTS = 15;
    const meals = mealsById.response.meals[0];
    for (let i = 1; i < NUM_INGREDIENTS; i += 1) {
      if (meals[`strIngredient${i}`] !== null
      && meals[`strIngredient${i}`].length > 0) {
        const medida = `${meals[`strIngredient${i}`]}`;
        const ingrediente = `${meals[`strMeasure${i}`]}`;
        ingredients.push(`${`${medida} ${ingrediente}`}`);
      }
    }

    return ingredients.map((ingredient, ind) => (
      <CheckboxComidas
        setDisabled={ setDisabled }
        id={ id }
        index={ ind }
        key={ ingredient }
        ingredient={ ingredient }
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
           className="finish-recipe-btn"
           data-testid="finish-recipe-btn"
           disabled={ disabled }
           onClick={ () => finishFunction() }
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
