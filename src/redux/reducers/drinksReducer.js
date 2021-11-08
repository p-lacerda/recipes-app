import { DRINKS_INFO } from '../actions';

export const INITIAL_STATE = {
  state: '',
};

function drinksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DRINKS_INFO:
    return { ...action.payload };
  default:
    return state;
  }
}

export default drinksReducer;
