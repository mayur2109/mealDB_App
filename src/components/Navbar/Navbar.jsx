import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <div className="navbar" aria-label="Main Navigation">
      <div className="navbar-heading">
        <h1>
          MealsDB <span>App</span>
        </h1>
      </div>
      <div className="navbar-links">
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/ingredients" activeClassName="active-link">
              Ingredients
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" activeClassName="active-link">
              Categories
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
