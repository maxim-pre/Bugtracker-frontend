import React, { Component } from "react";
import Table from "./common/table";
class ProjectTicketsTable extends Component {
  columns = [
    { path: "title", label: "Tickets Title" },
    { path: "description", label: "description" },
    { path: "submitter.user.username", label: "Tickets Author" },
    {
      key: "actions",
      content: (ticket) => (
        <div className="dropdown text-center">
          <li
            className="fa fa-ellipsis-v"
            type="button"
            id="dropdownMenuButton"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          ></li>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a
              className="dropdown-item"
              onClick={() => this.props.onDelete(ticket)}
            >
              Delete Ticket
            </a>
            <a
              className="dropdown-item"
              onClick={() => this.props.onUpdate(ticket)}
            >
              Update Ticket
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

export default ProjectTicketsTable;
