import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import FormBackground from "./common/wrappers/formBackground";
import { Link } from "react-router-dom";
import { updateProject } from "./../services/projectService";
import { toast } from "react-toastify";
import { Placeholder } from "react-bootstrap";
class UpdateProjectForm extends Form {
  state = {
    data: {
      name: "",
      description: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
  };

  componentDidMount() {
    const { project } = this.props;
    const data = {
      name: project.name,
      description: project.description,
    };
    this.setState({ data });
  }

  doSubmit = async () => {
    try {
      const { project } = this.props;
      const { data } = this.state;
      await updateProject(project.id, data, localStorage.getItem("token"));
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 403)
        toast.error(ex.response.data.error);
    }
  };

  render() {
    return (
      <React.Fragment>
        <form action="" id="updateProject" className="user">
          {this.renderInput("name", "Project Title", "text")}
          {this.renderTextArea("description", "Project Description")}
          {this.rederButton("Save Changes")}
        </form>
        <hr />
      </React.Fragment>
    );
  }
}

export default UpdateProjectForm;
