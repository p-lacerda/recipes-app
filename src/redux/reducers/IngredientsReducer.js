import { MEALS_INGREDIENTS, DRINKS_INGREDIENTS } from '../actions';

export const INITIAL_STATE = {
  state: '',
  ingredients: {},
};

function IngredientsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case MEALS_INGREDIENTS:
    return { ...state, ingredients: action.payload };
  case DRINKS_INGREDIENTS:
    return { ...state, ingredients: action.payload };
  default:
    return { ...state };
  }
}

export default IngredientsReducer;
