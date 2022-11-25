import React, { Component } from "react";
import Table from "./common/table";
import { Link } from "react-router-dom";

class ProjectTable extends Component {
  columns = [
    {
      path: "name",
      label: "Title",
      content: (project) => (
        <Link to={`/projects/${project.id}`}>{project.name}</Link>
      ),
    },
    { path: "description", label: "Description" },
    { path: "creator.user.username", label: "Creator" },
    { path: "date_created", label: "Date Created" },
  ];

  render() {
    const { data } = this.props;
    return (
      <Table
        columns={this.columns}
        data={data}
        onItemSelect={this.handleProjectChange}
      />
    );
  }
}

export default ProjectTable;
