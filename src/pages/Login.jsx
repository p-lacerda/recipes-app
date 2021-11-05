import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
// import { connect } from 'react-redux';

const Login = (props) => {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '', disabled: true });

  const MINIMUM_PASSWORD_LENGTH = 6;
  const handleChange = ({ target: { value, name } }) => {
    if (name === 'email') {
      const emailValidation = /^[ ]*([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})[ ]*$/i;
      if (emailValidation.test(value) && loginInfo.password.length >= MINIMUM_PASSWORD_LENGTH) {
        setLoginInfo({ ...loginInfo, [name]: value, disabled: false });
        // console.log(loginInfo);
        console.log(loginInfo.disabled);
      }
    } else {
      setLoginInfo({ ...loginInfo, [name]: value });
      console.log(loginInfo);
    }
};

  const handleClick = () => {
    const { history } = props;
    history.push('/comidas');
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
        disabled={ loginInfo.disabled }
      />
    </>
  );
};

export default Login;
