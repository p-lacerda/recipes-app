import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
import loginBg from '../images/login.jpg';
import './css/Login.css';

const Login = () => {
  const history = useHistory();
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '', disabled: true });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const MINIMUM_PASSWORD_LENGTH = 6;
    const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;

    if (emailValidation.test(email) && password.length > MINIMUM_PASSWORD_LENGTH) {
      setLoginInfo({ ...loginInfo, email, password, disabled: false });
    } else { setLoginInfo({ ...loginInfo, email, password, disabled: true }); }
  }, [email, password]);

  const handleClick = async () => {
    const user = {
      email,
    };

    // Adiciona chaves mealsToken, cocktailsToken e user, dando a eles seus valores padrões
    // e adicionando o email do usuário dentro de user
    localStorage.mealsToken = JSON.stringify(1);
    localStorage.cocktailsToken = JSON.stringify(1);
    localStorage.user = JSON.stringify(user);

    history.push('/comidas');
  };

  return (
    <main className="login__container">
      <div className="login">
        <h2>Login</h2>
        <Input
          type="email"
          name="email"
          onChange={ ({ target: { value } }) => setEmail(value) }
          dataTestId="email-input"
        />
        <Input
          type="password"
          name="password"
          onChange={ ({ target: { value } }) => setPassword(value) }
          dataTestId="password-input"
        />
        <Button
          dataTestId="login-submit-btn"
          onClick={ () => handleClick() }
          buttonName="Entrar"
          disabled={ loginInfo.disabled }
        />
      </div>
    </main>
  );
};

export default Login;
