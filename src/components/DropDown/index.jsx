// react lib imports
import React from 'react';

// third-party-imports
import PropTypes from 'prop-types';

// styles
import './DropDown.scss';

/**
 * The renders the Drop Down component
 *
 * @returns {JSX} JSX
 */
const DropDown = ({ handleSortClick, className }) =>  (
  <div className={`dropdown__container ${className}`}>
    <button
      type="button"
      className="dropdown__btn"
    >
      <p>Sort By <span><i className="down__arrow"></i></span></p>
    </button>
    <div className="dropdown__content">
      <button
        type="button"
        className="dropdown__btn__item"
        onClick={(event) => handleSortClick(event, 'unique')}
      >
        Id
      </button>
      <button
        type="button"
        className="dropdown__btn__item"
        onClick={(event) => handleSortClick(event, 'highest')}
      >
        Highest Number
      </button>
      <button
        type="button"
        className="dropdown__btn__item"
        onClick={(event) => handleSortClick(event, 'lowest')}
      >
        Lowest Number
      </button>
    </div>
  </div>
);

DropDown.propTypes = {
  className: PropTypes.string,
  handleSortClick: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
  className: '',
};

export default DropDown;
