import React from 'react';
import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import rootReducer from '../redux/reducers';

const renderWithRedux = (
  component,
  { initialState, store = createStore(rootReducer, initialState) } = {},
) => ({
  ...render(<Provider store={ store }>{component}</Provider>),
  store,
  history: createMemoryHistory(),
});

export default renderWithRedux;
