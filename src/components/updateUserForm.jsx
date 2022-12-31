import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { updateUser } from "../services/adminService";
import { toast } from "react-toastify";
class UpdateUserForm extends Form {
  state = {
    data: {
      first_name: "",
      last_name: "",
      email: "",
    },
    errors: {},
  };

  componentDidMount() {
    const { email, first_name, last_name, is_staff, username } =
      this.props.user;

    const data = {
      first_name: first_name,
      last_name: last_name,
      email: email,
    };
    this.setState({ data });
  }

  schema = {
    first_name: Joi.string().required().label("First Name"),
    last_name: Joi.string().required().label("Last Name"),
    email: Joi.string().email().required().label("Email"),
  };

  doSubmit = async () => {
    const user_id = this.props.user.id;
    const data = this.state.data;
    console.log(data);
    const token = localStorage.getItem("token");
    try {
      await updateUser(user_id, data, token);
      window.location.reload(false);
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 403)
        toast.error(ex.response.data.error);
    }
  };

  render() {
    const { data, errors } = this.state;
    return (
      <form action="" className="user">
        <div className="row m-2">
          <div className="col">
            {this.renderInput("first_name", "First Name")}
          </div>
          <div className="col">
            {this.renderInput("last_name", "Last Name")}
          </div>
        </div>

        <div className="row m-2">{this.renderInput("email", "Email")}</div>
        <div className="row m-2">
          <div className="form-group d-sm-flex align-items-center">
            <button
              disabled={this.validate()}
              className="btn btn-primary"
              onClick={this.handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default UpdateUserForm;
