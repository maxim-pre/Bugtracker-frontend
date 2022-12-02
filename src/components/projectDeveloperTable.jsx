import React, { Component } from "react";
import Table from "./common/table";

class ProjectDevelopersTable extends Component {
  columns = [
    { path: "user.username", label: "Username" },
    { path: "user.email", label: "Email" },
    { path: "user.phone", label: "Phone Number" },
  ];
  render() {
    const { data, sortColumn } = this.props;
    return <Table columns={this.columns} data={data} sortColumn={sortColumn} />;
  }
}

export default ProjectDevelopersTable;
