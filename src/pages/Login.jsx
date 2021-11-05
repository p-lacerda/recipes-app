import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';
// import { connect } from 'react-redux';

const Login = (props) => {
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
        onClick={ handleClick }
        buttonName="Entrar"
        disabled={ loginInfo.disabled }
      />
    </>
  );
};

export default Login;
