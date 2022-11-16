import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import RegistrationForm from "./components/registrationForm";
import ProjectTable from "./components/projectsTable";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginForm from "./components/loginForm";
class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/projects" element={<ProjectTable />} />
      </Routes>
    );
  }
}

export default App;
