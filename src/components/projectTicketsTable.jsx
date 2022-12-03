import React, { Component } from "react";
import Table from "./common/table";

class ProjectTicketsTable extends Component {
  columns = [
    { path: "title", label: "Tickets Title" },
    { path: "description", label: "description" },
    { path: "submitter.user.username", label: "Tickets Author" },
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

export default ProjectTicketsTable;
