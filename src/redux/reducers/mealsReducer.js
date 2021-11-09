import { MEALS_INFO, MEALS_FILT_INFO } from '../actions';

export const INITIAL_STATE = {
  state: '',
  mealsFilt: {},
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case MEALS_INFO:
    return { ...action.payload };
  case MEALS_FILT_INFO:
    return { ...state, mealsFilt: action.payload };
  default:
    return state;
  }
}

export default foodsReducer;
