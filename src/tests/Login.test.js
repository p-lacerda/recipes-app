// npm install -D fetch-mock-jest // INSTALADO
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import renderWithRouterAndRedux from '../helpers';

const EMAIL_ALUNO = 'aluno@trybe.com';
const SENHA_ALUNO = 'senha123';

test('testa se o botão existe e está desativado ao entrar na página', () => {
  const { getByText } = renderWithRouterAndRedux(<Login />);
  const linkElement = getByText(/Entrar/i);
  expect(linkElement).toBeInTheDocument();
  expect(linkElement).toBeDisabled();
});

test('testa se ao digitar algo no input email, o texto aparece', () => {
  renderWithRouterAndRedux(<Login />);
  const emailInput = screen.getByTestId('email-input');
  userEvent.type(emailInput, EMAIL_ALUNO);
  expect(emailInput).toHaveValue(EMAIL_ALUNO);
});

test('testa se ao digitar algo no input password, o texto aparece', () => {
  renderWithRouterAndRedux(<Login />);
  const passwordInput = screen.getByTestId('password-input');
  userEvent.type(passwordInput, SENHA_ALUNO);
  expect(passwordInput).toHaveValue(SENHA_ALUNO);
});

test('testa clique do botão', () => {
  const { history } = renderWithRouterAndRedux(<Login />);
  const passwordInput = screen.getByTestId('password-input');
  const btnClick = screen.getByTestId('login-submit-btn');
  const emailInput = screen.getByTestId('email-input');
  userEvent.type(emailInput, EMAIL_ALUNO);
  userEvent.type(passwordInput, SENHA_ALUNO);
  userEvent.click(btnClick);
  expect(history.location.pathname).toBe('/comidas');
});
