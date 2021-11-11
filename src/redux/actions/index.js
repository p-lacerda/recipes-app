import getApis from '../../services/APIs';

export const MEALS_INFO = 'MEALS';
export const DRINKS_INFO = 'COCKTAILS';
export const MEALS_FILT_INFO = 'MEALS_fILT';
export const DRINKS_FILT_INFO = 'DRINKS_FILT';
export const MEALS_INFO_BYID = 'MEALS_INFO_BYID';
export const DRINKS_INFO_BYID = 'DRINKS_INFO_BYID';

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

export const mealsInfoByID = (response) => ({
  type: MEALS_INFO_BYID,
  payload: {
    response,
  },
});

export const drinksInfoByID = (response) => ({
  type: DRINKS_INFO_BYID,
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

export const mealsThunkById = (id) => async (dispatch) => {
  const response = await getApis(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  dispatch(mealsInfoByID(response));
};

export const drinksThunkById = (id) => async (dispatch) => {
  console.log(id);
  const response = await getApis(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
  dispatch(drinksInfoByID(response));
};
