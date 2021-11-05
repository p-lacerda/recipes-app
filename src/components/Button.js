import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ dataTestId, buttonName, onClick, disabled }) => (
  <button
    type="button"
    data-testid={ dataTestId }
    onClick={ onClick }
    disabled={ disabled }
  >
    {buttonName}
  </button>
);

Button.propTypes = {
  buttonName: PropTypes.string.isRequired,
  dataTestId: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
