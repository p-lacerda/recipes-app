import { DRINKS_INFO, DRINKS_FILT_INFO, DRINKS_INFO_BYID } from '../actions';

export const INITIAL_STATE = {
  state: '',
  drinksFilt: {},
  drinksRedu: {},
};

function drinksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINKS_INFO:
    return { ...state, drinksRedu: action.payload };
  case DRINKS_FILT_INFO:
    return { ...state, drinksFilt: action.payload };
  case DRINKS_INFO_BYID:
    return { ...state, drinksInfoByID: action.payload };
  default:
    return state;
  }
}

export default drinksReducer;
