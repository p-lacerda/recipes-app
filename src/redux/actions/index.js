import { getApis } from '../../services/APIs';

export const MEALS_INFO = 'MEALS';
export const DRINKS_INFO = 'COCKTAILS';

export const mealsInfo = (response) => ({
  type: MEALS_INFO,
  payload: {
    response,
  },
});

export const drinksInfo = (response) => ({
  type: DRINKS_INFO,
  payload: {
    response,
  },
});

export const mealsThunk = () => async (dispatch) => {
  const response = await getApis('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  dispatch(mealsInfo(response));
};

export const drinksThunk = () => async (dispatch) => {
  const response = await getApis('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  dispatch(drinksInfo(response));
};
