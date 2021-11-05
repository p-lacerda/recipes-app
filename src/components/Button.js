import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ dataTestId, buttonName, onClick }) => (
  <button type="button" data-testid={ dataTestId } onClick={ onClick }>
    { buttonName }
  </button>
);

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
