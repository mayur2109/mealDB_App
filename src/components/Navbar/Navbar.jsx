import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar" aria-label="Main Navigation">
      <Link to="/" className="title">
        MealsDB <span>App</span>
      </Link>
      <div className={`menu ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
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
    </nav>
  );
};

export default Navbar;
