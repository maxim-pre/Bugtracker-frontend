import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import DropDownLink from "./common/dropdownLink";

class ProjectTable extends Component {
  columns = [
    {
      path: "name",
      label: "Title",
      content: (project) => (
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      ),
    },
    {
      path: "description",
      label: "Description",
    },
    {
      path: "creator.user.username",
      label: "Creator",
    },
    {
      key: "updateDelete",
      className: "text-right text-xs font-weight-bold",
      content: (project) => (
        <React.Fragment>
          <button className="btn btn-sm edit ">
            <i
              className="fa fa-pencil"
              aria-hidden="true"
              onClick={() => this.props.onUpdate(project)}
            ></i>
          </button>

          <button className="btn btn-sm edit">
            <i
              className="fa fa-trash-o"
              aria-hidden="true"
              onClick={() => this.props.onDelete(project)}
            ></i>
          </button>
        </React.Fragment>
      ),
    },
  ];

  render() {
    const { data, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={data}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default ProjectTable;
