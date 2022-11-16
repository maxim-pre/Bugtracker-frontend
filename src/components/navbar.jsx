import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <Link class="nav-item nav-link" to="/dashboard">
              Dashboard <span class="sr-only"></span>
            </Link>
            <Link class="nav-item nav-link" to="/projects">
              Projects
            </Link>
            <Link class="nav-item nav-link" to="/login">
              Login
            </Link>
            <Link class="nav-item nav-link" to="/register">
              Register
            </Link>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
