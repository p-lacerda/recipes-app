import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
// Importando SVG como Componente
// https://blog.logrocket.com/how-to-use-svgs-in-react/
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import { drinksThunkById, mealsThunk } from '../redux/actions';

function BebidasDetalhes(props) {
  const { match: { params: { id } } } = props;
  const { match: { url } } = props;
  const [heartIcon, setHeartIcon] = useState(whiteHeartIcon);
  const { drinksById, drinksInfoById, meals, mealsInfo } = props;
  const ingredients = [];
  const TIME_OUT = 5000;
  const [linkCopy, setLinkCopy] = useState('no');
  const [buttonChange, setButtonChange] = useState('Iniciar');
  const history = useHistory();

  const verifyProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.cocktails[id]) {
      setButtonChange('Continuar Receita');
    }
  };

  const verifyFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filtraFavoID = favorites.filter((favorite) => favorite.id === String(id));
    if (filtraFavoID.length > 0) {
      setHeartIcon(blackHeartIcon);
    }
  };

  const initValues = () => {
    const init = {
      cocktails: {

      },
      meals: {

      },
    };

    const initFavorites = [
      // id: 0,
      // type: '',
      // area: '',
      // category: '',
      // alcoholicOrNot: '',
      // name: '',
      // image: '',
    ];

    if (!localStorage.favoriteRecipes) {
      localStorage.favoriteRecipes = JSON.stringify(initFavorites);
    }

    if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify(init);
    }
  };

  const handleClickInit = ({ target }) => {
    if (target.innerHTML === 'Iniciar') {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      inProgressRecipes.cocktails = {
        ...inProgressRecipes.cocktails,
        [id]: ingredients,
      };
      localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
      setButtonChange('Continuar Receita');
    }
  };

  useEffect(() => {
    initValues();
    drinksInfoById(id);
    mealsInfo();
    verifyProgress();
    verifyFavorite();
  }, []);

  useEffect(() => {
    setInterval(() => {
      setLinkCopy('no');
    }, TIME_OUT);
  }, [linkCopy]);

  const favoriteFunction = () => {
    let favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favoriteSave = favoriteRecipes.filter((favorite) => favorite.id === String(id));
    if (favoriteSave.length === 0) {
      favoriteRecipes = [
        {
          id,
          type: 'bebida',
          area: drinksById.response.drinks[0].strArea,
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
  };

  const generateIngredients = () => {
    const NUM_INGREDIENTS = 15;
    const drinks = drinksById.response.drinks[0];
    for (let i = 1; i <= NUM_INGREDIENTS; i += 1) {
      if (drinks[`strIngredient${i}`] !== null) {
        ingredients.push([drinks[`strIngredient${i}`], [drinks[`strMeasure${i}`]]]);
      }
    }

    return ingredients.map((ingredient, ind) => (
      <li key={ ingredient } data-testid={ `${ind}-ingredient-name-and-measure` }>
        { `${ingredient[0]}   ${ingredient[1]}` }
      </li>));
  };

  const MAXIMUM_CARDS_LENGTH = 6;

  return (
    <div>
      {drinksById
    && (
      <>
        <img
          src={ drinksById.response.drinks[0].strDrinkThumb }
          alt={ drinksById.response.drinks[0].strDrink }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">
          { drinksById.response.drinks[0].strDrink }
        </p>
        <button
          type="button"
          data-testid="share-btn"
          // https://stackoverflow.com/questions/39501289/in-reactjs-how-to-copy-text-to-clipboard
          // Gary Vernon Grubb
          onClick={ () => {
            window.navigator.clipboard.writeText(`http://localhost:3000${url}`);
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
          {(drinksById.response.drinks[0].strAlcoholic)}
        </h3>
        <h3> Ingredientes </h3>
        <ul>
          { generateIngredients()}
        </ul>
        <h3> Instruções </h3>
        <p data-testid="instructions">
          { drinksById.response.drinks[0].strInstructions }
        </p>

        <div className="recommendation__container">
          { meals && meals.meals.map(({ strMealThumb, strMeal }, index) => (
            index < MAXIMUM_CARDS_LENGTH
              && (<RecommendationCard
                img={ strMealThumb }
                title={ strMeal }
                index={ index }
              />
              )
          ))}
        </div>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="button-init"
          onClick={ (e) => {
            handleClickInit(e);
            history.push(`/bebidas/${id}/in-progress`);
          } }
        >
          { buttonChange }

        </button>

      </>
    )}
    </div>
  );
}

BebidasDetalhes.propTypes = {
  drinksInfoById: PropTypes.func.isRequired,
  drinksById: PropTypes.arrayOf(PropTypes.any).isRequired,
  drinks: PropTypes.arrayOf(PropTypes.any).isRequired,
  meals: PropTypes.arrayOf(PropTypes.any).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  mealsInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
};

const mapStateToProps = (state) => ({
  drinksById: state.drinksReducer.drinksInfoByID,
  meals: state.mealsReducer.response,
});

const mapDispatchToProps = (dispatch) => ({
  drinksInfoById: (id) => dispatch(drinksThunkById(id)),
  mealsInfo: () => dispatch(mealsThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BebidasDetalhes);
