import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RecommendationCard from '../components/RecommendationCard';
// Importando SVG como Componente
// https://blog.logrocket.com/how-to-use-svgs-in-react/
import ShareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import { mealsThunkById, drinksThunk } from '../redux/actions';

function ComidasDetalhes(props) {
  const { match: { params: { id } } } = props;
  const { mealsById, mealsInfoById, drinks, drinksInfo } = props;
  const ingredients = [];

  useEffect(() => {
    mealsInfoById(id);
    drinksInfo();
  }, []);

  const generateIngredients = () => {
    const NUM_INGREDIENTS = 15;
    const meals = mealsById.response.meals[0];
    for (let i = 1; i <= NUM_INGREDIENTS; i += 1) {
      if (meals[`strIngredient${i}`] !== '') {
        ingredients.push([meals[`strIngredient${i}`], [meals[`strMeasure${i}`]]]);
      }
    }

    return ingredients.map((ingredient, ind) => (
      <li key={ ind } data-testid={ `${ind}-ingredient-name-and-measure` }>
        { `${ingredient[0]}   ${ingredient[1]}` }
      </li>));
  };

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

        <div>
          { drinks && drinks.drinks.map(({ strDrinkThumb, strDrink }, index) => (
            index < 2
              && (<RecommendationCard
                img={ strDrinkThumb }
                title={ strDrink }
                index={ index }
              />
              )
          ))}
        </div>
        <button type="button" data-testid="start-recipe-btn">Iniciar</button>

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
  }).isRequired,
  drinksInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
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
