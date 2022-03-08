import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const Navbar = ({ handleClick, isLoggedIn, isAdmin }) => (
  <header className="header">
    <a href="#">
      <img
        class="logo-img"
        alt="logo"
        src="https://cdn.shopify.com/s/files/1/0012/8660/2848/files/logo-horizontal_190x.png?v=1546919365"
      />
    </a>
    <nav className="main-nav">
      {isLoggedIn ? (
        <ul className="main-nav-list">
          {/* The navbar will show these links after you log in */}
          <li>
            <Link className="main-nav-link" to="/home">
              Home
            </Link>
          </li>
          <li>
            <Link className="main-nav-link" to="/products">
              Chocolate
            </Link>
          </li>
          <li>
            <Link className="main-nav-link" to="/cart">
              Cart
            </Link>
          </li>
          {isAdmin ? (
            <li>
              <Link className="main-nav-link" to="/users">
                Users Info
              </Link>
            </li>
          ) : (
            ""
          )}
          <li>
            <a className="main-nav-link" href="#" onClick={handleClick}>
              Logout
            </a>
          </li>
        </ul>
      ) : (
        <ul className="main-nav-list">
          {/* The navbar will show these links before you log in */}
          <Link className="main-nav-link" to="/home">
            Home
          </Link>
          <Link className="main-nav-link" to="/products">
            Chocolate
          </Link>
          <Link className="main-nav-link" to="/cart">
            Cart
          </Link>
          <Link className="main-nav-link" to="/login">
            Login
          </Link>
          <Link className="main-nav-link" to="/signup">
            Sign Up
          </Link>
        </ul>
      )}
    </nav>
  </header>
);

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(Navbar);
