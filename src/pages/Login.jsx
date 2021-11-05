import React, { useState } from 'react';
import Input from '../components/Input';
import Button from '../components/Button';

const Login = () => {
  const [loginInfo, setLoginInfo] = useState({});

  const handleChange = ({ target: { value, name } }) => {
    setLoginInfo({ [name]: value });
  };

  const handleClick = () => {
    
  };

  return (
    <>
      <h2>Login</h2>
      <Input
        type="email"
        name="email"
        onChange={ handleChange }
        dataTestId="email-input"
      />
      <Input
        type="password"
        name="password"
        onChange={ handleChange }
        dataTestId="password-input"
      />
      <Button
        dataTestId="login-submit-btn"
        onClick={ handleClick }
        buttonName="Entrar"
      />
    </>
  );
};

export default Login;
