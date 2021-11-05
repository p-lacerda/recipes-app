import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ type, name, onChange, dataTestId }) => (
  <input
    type={ type }
    name={ name }
    onChange={ onChange }
    data-testid={ dataTestId }
  />
);

Input.propTypes = {
  dataTestId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
};

Input.defaultProps = {
  type: 'text',
};

export default Input;
