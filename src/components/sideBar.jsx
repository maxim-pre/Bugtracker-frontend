import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavItem from "./common/navItem";

class SideBar extends Component {
  state = {};
  render() {
    return (
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <hr className="sidebar-divider my-0" />

        <NavItem
          label={"Dashboard"}
          url={"/dashboarad"}
          isactive={true}
          icon={<i className="fa fa-tachometer" aria-hidden="true"></i>}
        />

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Interface</div>

        <NavItem
          label={"Projects"}
          url={"/projects"}
          isactive={false}
          icon={<i className="fa fa-users" aria-hidden="true"></i>}
        />
        <NavItem
          label={"Tickets"}
          url={"/Tickets"}
          isactive={false}
          icon={<i className="fa fa-ticket" aria-hidden="true"></i>}
        />
      </ul>
    );
  }
}

export default SideBar;
