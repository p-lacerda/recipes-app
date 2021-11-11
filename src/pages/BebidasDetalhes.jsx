import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
// Importando SVG como Componente
// https://blog.logrocket.com/how-to-use-svgs-in-react/
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { drinksThunkById, mealsThunk } from '../redux/actions';

function BebidasDetalhes(props) {
  const { match: { params: { id } } } = props;
  const { match: { url } } = props;
  const { drinksById, drinksInfoById, meals, mealsInfo } = props;
  const ingredients = [];
  const [buttonChange, setButtonChange] = useState('Iniciar');
  const history = useHistory();

  console.log(url);

  const verifyProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.cocktails[id]) {
      setButtonChange('Continuar Receita');
    }
  };

  const initValues = () => {
    const init = {
      cocktails: {

      },
      meals: {

      },
    };

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
  }, []);

  console.log(meals);

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
            navigator.clipboard.writeText(`http://localhost:3000${url}`);
            alert('Link copiado!');
          } }
        >
          <img src={ ShareIcon } alt="Compartilhar" />
        </button>
        <button
          type="button"
          data-testid="favorite-btn"
        >
          <img src={ whiteHeartIcon } alt="favoritar" />
        </button>
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
