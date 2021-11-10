import { DRINKS_INFO, DRINKS_FILT_INFO } from '../actions';

export const INITIAL_STATE = {
  state: '',
  drinksFilt: {},
};

function drinksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINKS_INFO:
    return { ...action.payload };
  case DRINKS_FILT_INFO:
    return { ...state, drinksFilt: action.payload };
  default:
    return state;
  }
}

export default drinksReducer;
