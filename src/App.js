import "./App.css";
import React, { Component } from "react";

import RegistrationFrom from "./components/registrationForm";
import projectTable from "./components/projectsTable";
import axios from "axios";

class App extends Component {
  render() {
    return (
      <div className="container">
        <RegistrationFrom />
        <projectTable />
      </div>
    );
  }
}

export default App;
