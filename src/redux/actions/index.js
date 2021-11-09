import getApis from '../../services/APIs';

export const MEALS_INFO = 'MEALS';
export const DRINKS_INFO = 'COCKTAILS';
export const MEALS_FILT_INFO = 'MEALS_fILT';
export const DRINKS_FILT_INFO = 'DRINKS_FILT';

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

export const mealsFiltInfo = (response) => ({
  type: MEALS_FILT_INFO,
  payload: {
    response,
  },
});

export const drinksFiltInfo = (response) => ({
  type: DRINKS_FILT_INFO,
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

export const mealsFiltThunk = (filt) => async (dispatch) => {
  const response = await getApis(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${filt}`);
  dispatch(mealsFiltInfo(response));
};

export const drinksFiltThunk = (filt) => async (dispatch) => {
  const response = await getApis(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filt}`);
  dispatch(drinksFiltInfo(response));
};
