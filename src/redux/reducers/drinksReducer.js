import { DRINKS_INFO, DRINKS_FILT_INFO, DRINKS_INFO_BYID,
  DRINKS_INFO_BYNAME, DRINKS_INFO_BYINGREDIENTS, BLOCK_DRINK } from '../actions';

export const INITIAL_STATE = {
  state: '',
  drinksFilt: {},
  drinksRedu: {},
  block: false,
};

function drinksReducer(state = INITIAL_STATE, action) {
  console.log(action.type);
  switch (action.type) {
  case DRINKS_INFO:
    return { ...state, drinksRedu: action.payload };
  case DRINKS_FILT_INFO:
    return { ...state, drinksFilt: action.payload };
  case DRINKS_INFO_BYID:
    return { ...state, drinksInfoByID: action.payload };
  case DRINKS_INFO_BYNAME:
    return { ...state, drinksRedu: action.payload };
  case DRINKS_INFO_BYINGREDIENTS:
    return { ...state, drinksRedu: action.payload };
  case BLOCK_DRINK:
    return { ...state, block: action.payload };
  default:
    return state;
  }
}

export default drinksReducer;
