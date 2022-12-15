import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { createProject } from "../services/projectService";
import { CreateComment } from "./../services/projectService";
import { getComments } from "../services/projectService";

class CommentForm extends Form {
  state = {
    data: {
      comment: "",
    },
    errors: {},
  };

  schema = {
    comment: Joi.string().required().label("Comment"),
  };

  doSubmit = async () => {
    const project_id = this.props.project_id;
    const ticket_id = this.props.ticket_id;
    try {
      await CreateComment(
        project_id,
        ticket_id,
        this.state.data,
        localStorage.getItem("token")
      );

      const { data: comments } = await getComments(
        project_id,
        ticket_id,
        localStorage.getItem("token")
      );
      this.props.onCreateComment(comments);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...ex.response.data };
        this.setState({ errors });
      }
    }
  };

  render() {
    const { data, errors } = this.state;
    const name = "comment";
    return (
      <form action="" className="user">
        <div className="input-group">
          <input
            className="form-control"
            type={"text"}
            id={name}
            name={name}
            onChange={this.handleChange}
            value={data[name]}
            placeholder={"your comment..."}
          />
          <div className="input-group-append">
            <button
              onClick={this.handleSubmit}
              className="btn btn-primary btn-sm"
            >
              Comment
            </button>
          </div>
          <div className="mt-1">
            {errors[name] && (
              <div className="alert alert-danger">{errors[name]}</div>
            )}
          </div>
        </div>
      </form>
    );
  }
}

export default CommentForm;
