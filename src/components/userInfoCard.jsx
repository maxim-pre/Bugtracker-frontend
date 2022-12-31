import React, { Component } from "react";
import _ from "lodash";
class UserInfoCard extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="card mb-4">
        <div className="card-header">
          <h6 className="m-0 text-primary font-weight-bold">
            Selected User Info
          </h6>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="">Username:</div>
            <div className="m-0 text-primary wrap-text">{user.username}</div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="">First name:</div>
              <div className="m-0 wrap-text text-primary">
                {user.first_name}
              </div>
            </div>
            <div className="col-6">
              <div className="">Last name:</div>
              <div className="m-0 text-primary wrap-text ">
                {user.last_name}
              </div>
            </div>
          </div>
          <div className="row mb-2">
            <div className="">Email:</div>
            <div className="m-0 text text-primary wrap-text">{user.email}</div>
          </div>
          <div className="row">
            <div className="col">
              <div className="text-xs">Staff</div>
              <div className="m-0 text-xs text-primary wrap-text">
                {user.is_staff === true ? "True" : "False"}
              </div>
            </div>
            <div className="col-6">
              <div className="text-xs">Super user</div>
              <div className="m-0 text-xs text-primary wrap-text">
                {user.is_superuser === true ? "True" : "False"}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserInfoCard;
