import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/home"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/recipes"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Recipes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/newrecipe"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                New Recipe
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/editrecipe"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Edit Recipe
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/profile"
                className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
              >
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;