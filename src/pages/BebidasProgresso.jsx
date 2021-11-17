import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { drinksThunkById } from '../redux/actions';
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import Checkbox from '../components/CheckboxBebidas';
import { initValues,
  verifyDisableButtonBebidas, verifyFavorite } from '../services/localStorage';
import '../components/css/Checkbox.css';

function BebidasProgresso(props) {
  const { drinksInfoById, drinksById } = props;
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
    if (disabled === true && localInProgressive.cocktails
      && Object.keys(localInProgressive.cocktails).length === 0
    && drinksById !== undefined) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      inProgressRecipes.cocktails = {
        ...inProgressRecipes.cocktails,
        [id]: ingredients,
      };
      localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
    }
  };

  const finishFunction = () => {
    const data = new Date();
    const dataComplete = `${data.getDate()}/${data.getMonth()}/${data.getUTCFullYear()}`;
    let doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes !== undefined) {
      const doneSave = doneRecipes.filter(
        (done) => done.id === String(id),
      );
      if (doneSave && doneSave.length === 0) {
        doneRecipes = [{
          id,
          type: 'bebida',
          category: drinksById.response.drinks[0].strCategory,
          alcoholicOrNot: drinksById.response.drinks[0].strAlcoholic,
          name: drinksById.response.drinks[0].strDrink,
          image: drinksById.response.drinks[0].strDrinkThumb,
          doneDate: dataComplete,
          tags: drinksById.response.drinks[0].strTags
            ? drinksById.response.drinks[0].strTags.split(',') : '',
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
            type: 'bebida',
            area: '',
            category: drinksById.response.drinks[0].strCategory,
            alcoholicOrNot: drinksById.response.drinks[0].strAlcoholic,
            name: drinksById.response.drinks[0].strDrink,
            image: drinksById.response.drinks[0].strDrinkThumb,
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
    drinksInfoById(id);
    verifyFavorite(id, setHeartIcon, blackHeartIcon);
    verifyDisableButtonBebidas(setDisabled, id);
  }, []);

  useEffect(() => {
    setInterval(() => {
      setLinkCopy('no');
    }, TIME_OUT);
  }, [linkCopy]);

  useEffect(() => {
    verifyInitLocal();
  }, [drinksById]);

  const generateIngredients = () => {
    const NUM_INGREDIENTS = 15;
    const drinks = drinksById.response.drinks[0];
    for (let i = 1; i <= NUM_INGREDIENTS; i += 1) {
      if (drinks[`strIngredient${i}`] !== null
      && drinks[`strIngredient${i}`].length > 0) {
        const ingrediente = `${drinks[`strIngredient${i}`]}`;
        const medida = `${(drinks[`strMeasure${i}`] ? drinks[`strMeasure${i}`] : '')}`;
        ingredients.push(`${`${ingrediente} ${medida}`}`);
      }
    }

    return ingredients.map((ingredient, ind) => (
      <Checkbox
        setDisabled={ setDisabled }
        id={ id }
        index={ ind }
        key={ ingredient }
        ingredient={ ingredient }
      />));
  };
  return (
    <>
      <p>BebidasProgresso</p>
      {drinksById && drinksById.response.drinks
     && (
       <>
         <img
           src={ drinksById.response.drinks[0].strDrinkThumb }
           alt="imagem receita bebida"
           data-testid="recipe-photo"
         />
         <h3 data-testid="recipe-title">{drinksById.response.drinks[0].strDrink}</h3>
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
           {drinksById.response.drinks[0].strCategory}
           {'   '}
           {(drinksById.response.drinks[0].strAlcoholic)}
         </h3>
         <h3> Ingredientes </h3>
         {generateIngredients()}
         <h3> Instruções </h3>
         <p data-testid="instructions">
           { drinksById.response.drinks[0].strInstructions }
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

BebidasProgresso.propTypes = {
  drinksInfoById: PropTypes.func.isRequired,
  drinksById: PropTypes.arrayOf(PropTypes.any).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  drinksById: state.drinksReducer.drinksInfoByID,
});

const mapDispatchToProps = (dispatch) => ({
  drinksInfoById: (id) => dispatch(drinksThunkById(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BebidasProgresso);
