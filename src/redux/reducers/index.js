import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import drinksReducer from './drinksReducer';
import IngredientsReducer from './IngredientsReducer';

const rootReducers = combineReducers({ mealsReducer, drinksReducer, IngredientsReducer });

export default rootReducers;
