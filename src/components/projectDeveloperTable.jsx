import React, { Component } from "react";
import DropDownLink from "./common/dropdownLink";
import Table from "./common/table";
import { deleteDeveloper } from "./../services/projectService";
import { toast } from "react-toastify";
class ProjectDevelopersTable extends Component {
  columns = [
    { path: "developer.user.username", label: "Username" },
    { path: "developer.user.email", label: "Email" },
    { path: "role", label: "Role" },
    {
      key: "actions",
      content: (developer) => (
        <div className="dropdown text-center">
          <button
            className="btn btn-sm"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <li className="fa fa-ellipsis-v"></li>
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              className="dropdown-item"
              onClick={() => this.props.onDelete(developer)}
            >
              Kick Developer
            </a>
            <a
              className="dropdown-item"
              onClick={() => this.props.onUpdate(developer)}
            >
              Update Developer
            </a>
          </div>
        </div>
      ),
    },
  ];
  render() {
    const { data, sortColumn, onSort } = this.props;
    return (
      <Table
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default ProjectDevelopersTable;
