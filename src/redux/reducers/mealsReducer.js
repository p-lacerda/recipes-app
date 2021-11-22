import {
  MEALS_INFO,
  MEALS_FILT_INFO,
  MEALS_INFO_BYID,
  MEALS_INFO_BYNAME,
} from '../actions';

export const INITIAL_STATE = {
  state: '',
  mealsFilt: {},
  mealsRedu: {},
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case MEALS_INFO:
    return { ...state, mealsRedu: action.payload };
  case MEALS_FILT_INFO:
    return { ...state, mealsFilt: action.payload };
  case MEALS_INFO_BYID:
    return { ...state, mealsInfoByID: action.payload };
  case MEALS_INFO_BYNAME:
    return { ...state, mealsRedu: action.payload };
  default:
    return state;
  }
}

export default foodsReducer;
