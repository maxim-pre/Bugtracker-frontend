import React, { Component } from "react";
import Table from "./common/table";

class OrganisationTable extends Component {
  columns = [
    { path: "username", label: "Username", click: true },
    { path: "email", label: "Email", click: true },
    { path: "date_joined", label: "Date Joined", click: true },
  ];
  render() {
    const { data, sortColumn, onSort, onSelect } = this.props;
    return (
      <Table
        clickable={true}
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
        onSelect={onSelect}
      />
    );
  }
}

export default OrganisationTable;
