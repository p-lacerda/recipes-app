import { MEALS_INFO } from '../actions';

export const INITIAL_STATE = {
  state: '',
};

function foodsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case MEALS_INFO:
    return { ...action.payload };
  default:
    return state;
  }
}

export default foodsReducer;
