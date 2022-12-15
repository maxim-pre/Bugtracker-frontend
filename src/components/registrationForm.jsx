import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
import { Link } from "react-router-dom";
import { login } from "../services/authService";
import FormBackground from "./common/wrappers/formBackground";
class RegistrationForm extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      email: "",
    },
    errors: {},
  };

  schema = {
    firstName: Joi.string().required().label("First Name"),
    lastName: Joi.string().required().label("Last Name"),
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
    email: Joi.string().email().required().label("Email"),
  };

  doSubmit = async () => {
    try {
      await register(this.state.data);
      const { data: jwt } = await login(
        this.state.data.username,
        this.state.data.password
      );
      localStorage.setItem("token", jwt.access);
      window.location.href = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...ex.response.data };
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <FormBackground>
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Create an account</h1>
        </div>
        <form action="" className="user">
          <div className="row">
            <div className="col">
              {this.renderInput("firstName", "First Name")}
            </div>
            <div className="col">
              {this.renderInput("lastName", "Last Name")}
            </div>
          </div>
          <div className="row">
            <div className="col">
              {this.renderInput("username", "username")}
            </div>
            <div className="col">
              {this.renderInput("password", "Password", "password")}
            </div>
          </div>
          {this.renderInput("email", "Email")}

          {this.rederButton("Submit")}
        </form>
        <hr className="form-divider" />
        <div class="text-center">
          <Link class="small" to="/login">
            Back to Login
          </Link>
        </div>
      </FormBackground>
    );
  }
}

export default RegistrationForm;
