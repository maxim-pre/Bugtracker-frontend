import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getUser } from "./services/authService";
import { ToastContainer } from "react-toastify";
import TopBar from "./components/topbar";
import SideBar from "./components/sideBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegistrationForm from "./components/registrationForm";
import Projects from "./components/projects";
import Tickets from "./components/tickets";
import Project from "./components/project";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Nav } from "react-bootstrap";
class App extends Component {
  state = {};

  async componentDidMount() {
    try {
      const response = await getUser(localStorage.getItem("token"));
      this.setState({ user: response.data });
    } catch (ex) {}
  }

  render() {
    if (this.state.user) {
      return (
        <React.Fragment>
          <ToastContainer />
          <div id="wrapper">
            <SideBar user={this.state.user} />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                {/* <TopBar user={this.state.user} /> */}
                <div className="container-fluid mt-4">
                  <Routes>
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route
                      path="/projects"
                      element={<Projects user={this.state.user} />}
                    />
                    <Route path="/projects/:project_id" element={<Project />} />
                    <Route
                      path="*"
                      element={<Projects user={this.state.user} />}
                    />
                  </Routes>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <div className="content">
          <Routes>
            <Route path="*" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
