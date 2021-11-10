import { combineReducers } from 'redux';
import mealsReducer from './mealsReducer';
import drinksReducer from './drinksReducer';

const rootReducers = combineReducers({ mealsReducer, drinksReducer });

export default rootReducers;
