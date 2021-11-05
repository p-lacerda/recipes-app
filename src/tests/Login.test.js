import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import Login from '../pages/Login';

test('testa se o botão existe e está desativado ao entrar na página', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Entrar/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeDisabled();
});

test('testa se ao clicar no botão é redirecionado para a página principal', () => {
  const { getByText } = render(<Login />);
  const linkElement = getByText(/Entrar/i);
  userEvent.click(linkElement)
  expect(history).toBe('/comidas');
});