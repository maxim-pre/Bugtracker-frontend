import React, { Component } from "react";
import NavItem from "./common/navItem";

class TopBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-expand navbar-light bg-primary mb-4 topbar static-top shadow">
        <ul className="navbar-nv mr-auto">
          <NavItem
            label={
              <button className="btn btn-sm btn-light btn-icon-split">
                <span className="icon text-black-50">
                  <i class="fa fa-sign-out" aria-hidden="true"></i>
                </span>
                <span className="text">Logout</span>
              </button>
            }
            url="/logout"
            isactive="false"
            className={"mr-2 d-lg-inline text-gray-600 small"}
          />
        </ul>
        <ul className="navbar-nav ml-auto">
          {user && (
            <React.Fragment>
              <NavItem
                label={
                  <button className="btn btn-sm btn-danger btn-icon-split">
                    <span className="icon text-white-50">
                      <i class="fa fa-sign-out" aria-hidden="true"></i>
                    </span>
                    <span className="text">Logout</span>
                  </button>
                }
                url="/logout"
                isactive="false"
                className={"mr-2 d-lg-inline text-gray-600 small"}
              />
              <div className="topbar-divider d-none d-sm-block"></div>
              <NavItem
                label={
                  <button className="btn btn-sm btn-primary btn-icon-split">
                    <span className="icon text-white-50">
                      <i class="fa fa-user" aria-hidden="true"></i>
                    </span>
                    <span className="text">{user.username}</span>
                  </button>
                }
                url="/profile"
                isactive="false"
                className={"mr-2 d-lg-inline text-gray-600 small"}
              />
            </React.Fragment>
          )}
        </ul>
      </nav>
    );
  }
}

export default TopBar;
