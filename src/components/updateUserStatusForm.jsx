import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { updateUser } from "../services/adminService";
import { toast } from "react-toastify";
class UpdateUserStatusForm extends Form {
  state = {
    data: {
      is_superuser: "",
      is_staff: "",
    },
    errors: {},
  };

  schema = {
    is_superuser: Joi.string().required().label("Superuser"),
    is_staff: Joi.string().required().label("Staff"),
  };

  componentDidMount() {
    const user = this.props.user;
    const data = {
      is_superuser: user.is_superuser === true ? "True" : "False",
      is_staff: user.is_staff === true ? "True" : "False",
    };
    this.setState({ data });
  }
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
        <div className="row">
          <div className="col">
            {this.renderSelectInput(
              "is_staff",
              "Staff",
              [
                { value: "False", label: "No" },
                { value: "True", label: "Yes" },
              ],
              this.props.user.is_staff === true ? "True" : "False"
            )}
          </div>
          <div className="col">
            {this.renderSelectInput(
              "is_superuser",
              "Superuser",
              [
                { value: "False", label: "No" },
                { value: "True", label: "Yes" },
              ],
              this.props.user.is_superuser === true ? "True" : "False"
            )}
          </div>
        </div>
        <button
          disabled={this.validate()}
          className="btn btn-primary"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </form>
    );
  }
}

export default UpdateUserStatusForm;
