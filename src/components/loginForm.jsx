import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { login } from "../services/authService";
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
      this.props.history.push("/");
    } catch (ex) {
      console.log(ex);
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
      <div>
        <h1>Login</h1>
        <form action="">
          {this.renderInput("username", "username")}
          {this.renderInput("password", "Password", "password")}
          {this.rederButton("Submit")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
