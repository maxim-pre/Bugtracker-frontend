import React, { Component, useDebugValue } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwtDecode from "jwt-decode";
import RegistrationForm from "./components/registrationForm";
import ProjectTable from "./components/projectsTable";
import LoginForm from "./components/loginForm";
import Navbar from "./components/navbar";
import NotFound from "./components/notFound";
import Logout from "./components/logout";
import { getUser } from "./services/authService";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import SideBar from "./components/sideBar";
import TopBar from "./components/topbar";
import CreateProjectForm from "./components/createProjectFrom";

class App extends Component {
  state = {};

  async componentDidMount() {
    try {
      const response = await getUser(localStorage.getItem("token"));
      this.setState({ user: response.data });
    } catch (ex) {}
  }

  render() {
    return (
      <React.Fragment>
        <div id="wrapper">
          <SideBar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <TopBar user={this.state.user} />
              <div className="container-fluid">
                <Routes>
                  <Route path="/login" element={<LoginForm />} />
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/register" element={<RegistrationForm />} />
                  <Route path="/projects" element={<ProjectTable />} />
                  <Route
                    path="/createproject"
                    element={<CreateProjectForm />}
                  />

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
