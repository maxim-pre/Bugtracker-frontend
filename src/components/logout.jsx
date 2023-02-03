import React, { Component } from "react";
import axios from "axios";
class Logout extends Component {
  componentDidMount() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("token");
    window.location.href = "/login";
  }
  render() {
    return null;
  }
}

export default Logout;
