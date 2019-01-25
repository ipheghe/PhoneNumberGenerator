// react lib imports
import React from 'react';

// third-party-imports
import PropTypes from 'prop-types';

// styles
import './NumberInput.scss';

/**
 * The NumberInput component that renders an input and button element
 *
 * @returns {JSX} JSX
 */
const NumberInput = ({
  value,
  onChange,
  buttonText,
  handleButtonClick,
}) =>  (
  <div className="input__container">
    <input
      id="chosenNumber"
      className="input__field"
      type="number"
      name="chosenNumber"
      value={value}
      onChange={onChange}
      max="500"
      min="1"
    />
    <button
      className="input__button"
      type="button"
      onClick={handleButtonClick}
    >
      {buttonText}
    </button>
  </div>
);

NumberInput.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};

export default NumberInput;
