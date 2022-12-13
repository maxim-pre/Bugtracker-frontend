import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";
import DropDownLink from "./common/dropdownLink";

class ProjectTable extends Component {
  renderContributors = (project) => {
    const developers = [...project.developers];

    return (
      <ul className="no-bullets">
        {developers.map((devs) => (
          <li>{`${devs.developer.user.username} ${
            devs.developer.user.username === project.creator.user.username
              ? "(creator)"
              : ""
          }`}</li>
        ))}
      </ul>
    );
  };

  columns = [
    {
      path: "name",
      label: "Title",
      click: true,
    },
    {
      path: "description",
      label: "Description",
      click: true,
      cellClass: "description wrap-text",
    },
    {
      label: "Contributors",
      click: true,
      content: (project) => this.renderContributors(project),
    },
    {
      key: "actions",
      cellClass: "actions text-right",
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

  selectProject = (item) => {
    return (window.location.href = `/projects/${item.id}`);
  };

  render() {
    const { data, onSort, sortColumn } = this.props;
    return (
      <Table
        clickable={true}
        columns={this.columns}
        data={data}
        onSort={onSort}
        sortColumn={sortColumn}
        onSelect={this.selectProject}
      />
    );
  }
}

export default ProjectTable;
