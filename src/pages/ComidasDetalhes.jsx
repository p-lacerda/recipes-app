import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecommendationCard from '../components/RecommendationCard';
// Importando SVG como Componente
// https://blog.logrocket.com/how-to-use-svgs-in-react/
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { mealsThunkById, drinksThunk } from '../redux/actions';

function ComidasDetalhes(props) {
  const { match: { params: { id } } } = props;
  const { match: { url } } = props;
  const { mealsById, mealsInfoById, drinks, drinksInfo } = props;
  const ingredients = [];
  const [buttonChange, setButtonChange] = useState('Iniciar');
  const TIME_OUT = 5000;
  const [linkCopy, setLinkCopy] = useState('no');
  const history = useHistory();

  const verifyProgress = () => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (inProgressRecipes.meals[id]) {
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

  useEffect(() => {
    initValues();
    mealsInfoById(id);
    drinksInfo();
    verifyProgress();
  }, []);

  useEffect(() => {
    setInterval(() => {
      setLinkCopy('no');
    }, TIME_OUT);
  }, [linkCopy]);
  const handleClickInit = ({ target }) => {
    if (target.innerHTML === 'Iniciar') {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      inProgressRecipes.meals = {
        ...inProgressRecipes.meals,
        [id]: ingredients,
      };
      localStorage.inProgressRecipes = JSON.stringify(inProgressRecipes);
      setButtonChange('Continuar Receita');
    }
  };
  const generateIngredients = () => {
    const NUM_INGREDIENTS = 15;
    const meals = mealsById.response.meals[0];
    for (let i = 1; i <= NUM_INGREDIENTS; i += 1) {
      if (meals[`strIngredient${i}`] !== '') {
        ingredients.push([meals[`strIngredient${i}`], meals[`strMeasure${i}`]]);
      }
    }

    return ingredients.map((ingredient, ind) => (
      <li key={ ind } data-testid={ `${ind}-ingredient-name-and-measure` }>
        { `${ingredient[0]}   ${ingredient[1]}` }
      </li>));
  };

  const MAXIMUM_CARDS_LENGTH = 6;

  return (
    <div>
      {mealsById
    && (
      <>
        <img
          src={ mealsById.response.meals[0].strMealThumb }
          alt={ mealsById.response.meals[0].strMeal }
          data-testid="recipe-photo"
        />
        <p data-testid="recipe-title">
          { mealsById.response.meals[0].strMeal }
        </p>
        <button
          type="button"
          data-testid="share-btn"
          onClick={ () => {
            navigator.clipboard.writeText(`http://localhost:3000${url}`);
            setLinkCopy('Link copiado!');
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
        {linkCopy === 'Link copiado!' && <p>{linkCopy}</p>}
        <h3 data-testid="recipe-category">
          {mealsById.response.meals[0].strCategory}
        </h3>
        <h3> Ingredientes </h3>
        <ul>
          { generateIngredients()}
        </ul>
        <h3> Instruções </h3>
        <p data-testid="instructions">
          { mealsById.response.meals[0].strInstructions }
        </p>
        <div className="video-responsive">
          <iframe
            data-testid="video"
            width="853"
            height="480"
            src={ `https://www.youtube.com/embed/${
              mealsById.response.meals[0].strYoutube.split('=')[1]
            }` }
            frameBorder="0"
            allow={ `accelerometer; autoplay; clipboard-write;
            encrypted-media; gyroscope; picture-in-picture` }
            allowFullScreen
            title="Embedded youtube"
          />
        </div>

        <div className="recommendation__container">
          { drinks && drinks.drinks.map(({ strDrinkThumb, strDrink }, index) => (
            index < MAXIMUM_CARDS_LENGTH
              && (<RecommendationCard
                img={ strDrinkThumb }
                title={ strDrink }
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
            history.push(`/comidas/${id}/in-progress`);
          } }
        >
          {buttonChange}

        </button>

      </>
    )}
    </div>
  );
}

ComidasDetalhes.propTypes = {
  mealsInfoById: PropTypes.func.isRequired,
  mealsById: PropTypes.arrayOf(PropTypes.any).isRequired,
  drinks: PropTypes.arrayOf(PropTypes.any).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    url: PropTypes.string,
  }).isRequired,
  drinksInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  mealsById: state.mealsReducer.mealsInfoByID,
  drinks: state.drinksReducer.drinksRedu.response,
});

const mapDispatchToProps = (dispatch) => ({
  mealsInfoById: (id) => dispatch(mealsThunkById(id)),
  drinksInfo: () => dispatch(drinksThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ComidasDetalhes);
