import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  state = {};
  render() {
    const user = this.props.user;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link" to="/dashboard">
              Dashboard <span className="sr-only"></span>
            </Link>
            <Link className="nav-item nav-link" to="/projects">
              Projects
            </Link>
            {!user && (
              <React.Fragment>
                <Link className="nav-item nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-item nav-link" to="/register">
                  Register
                </Link>
              </React.Fragment>
            )}
            {user && (
              <React.Fragment>
                <Link className="nav-item nav-link" to="/profile">
                  {user.username}
                </Link>
                <Link className="nav-item nav-link" to="/logout">
                  Logout
                </Link>
              </React.Fragment>
            )}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
