import React, { Component } from "react";
import NavItem from "./common/navItem";

class TopBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
        <ul class="navbar-nav ml-auto">
          {!user && (
            <React.Fragment>
              <NavItem
                label="Login"
                url="/login"
                isactive="false"
                className={"mr-2 d-none d-lg-inline text-gray-600 small"}
              />
              <NavItem
                label="Register"
                url="/register"
                isactive="false"
                className={"mr-2 d-none d-lg-inline text-gray-600 small"}
              />
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavItem
                label="Logout"
                url="/logout"
                isactive="false"
                className={"mr-2 d-none d-lg-inline text-gray-600 small"}
              />
              <div class="topbar-divider d-none d-sm-block"></div>
              <NavItem
                label="Profile"
                url="/profile"
                isactive="false"
                className={"mr-2 d-none d-lg-inline text-gray-600 small"}
              />
            </React.Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

export default TopBar;
