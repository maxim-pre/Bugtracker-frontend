import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { register } from "../services/userService";
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
      <div>
        <h1>Create User</h1>
        <form action="">
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("username", "username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("email", "Email")}

          {this.rederButton("Submit")}
        </form>
      </div>
    );
  }
}

export default RegistrationForm;
