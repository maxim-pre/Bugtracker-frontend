import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import FormBackground from "./common/wrappers/formBackground";
import { createProject } from "../services/projectService";

class CreateProjectForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    description: Joi.string().required().label("Description"),
  };

  doSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      await createProject(this.state.data, token);
      window.location.href = "/projects";
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
      <form action="" className="user">
        {this.renderInput("name", "Name")}
        {this.renderTextArea("description", "Description")}
        {this.rederButton("Create")}
      </form>
    );
  }
}

export default CreateProjectForm;
