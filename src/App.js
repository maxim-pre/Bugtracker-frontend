import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./services/authService";
import { ToastContainer } from "react-toastify";
import TopBar from "./components/topbar";
import SideBar from "./components/sideBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegistrationForm from "./components/registrationForm";
import Projects from "./components/projects";
import Project from "./components/project";
import CreateProjectForm from "./components/createProjectFrom";
import NotFound from "./components/notFound";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Toast } from "react-bootstrap";
import UpdateProjectForm from "./components/updateProjectForm";
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
        <ToastContainer />
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
                  <Route
                    path="/projects"
                    element={<Projects user={this.state.user} />}
                  />
                  <Route path="/projects/:project_id" element={<Project />} />

                  <Route
                    path="/createproject"
                    element={<CreateProjectForm />}
                  />
                  <Route
                    path="/updateproject"
                    element={<UpdateProjectForm />}
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
