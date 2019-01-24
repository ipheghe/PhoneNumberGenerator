import React from 'react';
import { Link } from '@reach/router';

import './Header.scss';

/**
 * The Header component primarily used for navigation between pages
 *
 * @returns {JSX} JSX
 */
const Header = () =>  (
  <div className="header__container">
    <h3>Number Generator</h3>
    <ul className="menu__container">
      <li className="menu__container__items">
        <Link to="/">Home</Link>
      </li>
      <li className="menu__container__items">
        <Link to="/operations">Operations</Link>
      </li>
    </ul>
  </div>
);

export default Header;
