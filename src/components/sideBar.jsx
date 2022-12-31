import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavItem from "./common/navItem";

class SideBar extends Component {
  state = {};
  render() {
    const { user } = this.props;
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
        id="accordionSidebar"
      >
        <NavItem
          label={"Tracker"}
          url={"/projects"}
          isactive={true}
          icon={<i class="fa fa-bug" aria-hidden="true"></i>}
        />

        <hr className="sidebar-dividers" />

        <div className="sidebar-heading">Interface</div>

        <NavItem
          label={"DashBoard"}
          url={"/projects"}
          isactive={false}
          icon={<i class="fa fa-desktop" aria-hidden="true"></i>}
        />
        <NavItem
          label={"Tickets"}
          url={"/Tickets"}
          isactive={false}
          icon={<i className="fa fa-ticket" aria-hidden="true"></i>}
        />
        {user.is_staff && (
          <NavItem
            label={"Administration"}
            url={"/admin"}
            isactive={false}
            icon={<i className="fa fa-database" aria-hidden="true"></i>}
          />
        )}
        <hr className="sidebar-dividers" />
        <div className="sidebar-heading">User actions</div>
        <NavItem
          label={"profile"}
          url="/profile"
          isactive={false}
          icon={<i class="fa fa-user" aria-hidden="true"></i>}
        />
        <NavItem
          label={"Logout"}
          url={"/logout"}
          isactive={false}
          icon={<i class="fa fa-sign-out" aria-hidden="true"></i>}
        />
      </ul>
    );
  }
}

export default SideBar;
