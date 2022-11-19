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

        <NavItem label={"Dashboard"} url={"/dashboarad"} isactive={false} />

        <hr className="sidebar-divider" />

        <div className="sidebar-heading">Interface</div>

        <NavItem label={"My Projects"} url={"/projects"} isactive={false} />
        <NavItem label={"My Tickets"} url={"/Tickets"} isactive={false} />
      </ul>
    );
  }
}

export default SideBar;
