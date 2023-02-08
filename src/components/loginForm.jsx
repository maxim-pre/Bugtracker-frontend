import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import FormBackground from "./common/wrappers/formBackground";
import { login } from "../services/authService";
import { Link } from "react-router-dom";
class LoginForm extends Form {
  state = {
    data: {
      username: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      const { data: jwt } = await login(data.username, data.password);
      localStorage.setItem("token", jwt.access);
      window.location.href = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 401) {
        const errors = { ...this.state.errors };
        errors.password = ex.response.data.detail;
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <FormBackground>
        <div className="text-center">
          <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
        </div>
        <form action="" className="user">
          {this.renderInput("username", "username")}
          {this.renderInput("password", "Password", "password")}
          {this.rederButton("Submit")}
        </form>
        <hr className="form-divider" />
        <div className="text-center">
          <Link className="small" to="/register">
            Create an Account!
          </Link>
        </div>
        <div className="text-center">
          <Link className="small" to="/demo">
            Login as the Demo Admin
          </Link>
        </div>
      </FormBackground>
    );
  }
}

export default LoginForm;
