import React, { Component, useDebugValue } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import RegistrationForm from "./components/registrationForm";
import ProjectTable from "./components/projectsTable";
import LoginForm from "./components/loginForm";
import Navbar from "./components/navbar";
import Project from "./components/project";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
class App extends Component {
  state = {};

  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
      console.log(user);
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/projects" element={<ProjectTable />} />
            <Route path="projects/:id" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
