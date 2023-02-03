import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";
import { getUser } from "./services/authService";
import { ToastContainer } from "react-toastify";
import SideBar from "./components/sideBar";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegistrationForm from "./components/registrationForm";
import Projects from "./components/projects";
import Tickets from "./components/tickets";
import Project from "./components/project";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Profile from "./components/profile";
import Admin from "./components/admin";
import Footer from "./components/footer";
class App extends Component {
  state = {};

  async componentDidMount() {
    try {
      const response = await getUser(localStorage.getItem("token"));
      this.setState({ user: response.data });
    } catch (ex) {}
  }

  render() {
    const user = this.state.user;
    if (user) {
      return (
        <React.Fragment>
          <ToastContainer />
          <div id="wrapper">
            <SideBar user={user} />
            <div id="content-wrapper" className="d-flex flex-column">
              <div id="content">
                {/* <TopBar user={user} /> */}
                <div className="container-fluid mt-4">
                  <Routes>
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/admin" element={<Admin user={user} />} />
                    <Route
                      path="/projects"
                      element={<Projects user={user} />}
                    />
                    <Route
                      path="/projects/:project_id"
                      element={<Project user={user} />}
                    />
                    <Route path="*" element={<Projects user={user} />} />
                  </Routes>
                </div>
                <Footer />
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
            <Route path="/" element={<LoginForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
          </Routes>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
