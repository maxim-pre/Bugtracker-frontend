import React, { Component } from "react";
import Table from "./common/table";
import { redirect } from "react-router-dom";
class TicketTable extends Component {
  columns = [
    {
      path: "title",
      label: "title",
      click: true,
    },
    {
      path: "project.name",
      label: "Project",
      Click: true,
    },
    {
      path: "priority",
      label: "Priority",
      click: true,
    },
    {
      path: "status",
      label: "Status",
      click: true,
    },
    {
      path: "type",
      label: "Type",
      click: true,
    },
  ];

  selectTicket = (item) => {
    return (window.location.href = `/projects/${item.project.id}`);
  };
  render() {
    const { data, sortColumn, onSort } = this.props;
    return (
      <Table
        clickable={true}
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
        onSelect={this.selectTicket}
      />
    );
  }
}

export default TicketTable;
