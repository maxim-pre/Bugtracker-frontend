import React, { Component } from "react";
import Table from "./common/table";
class ProjectTicketsTable extends Component {
  columns = [
    { path: "title", label: "Tickets Title", click: true },
    { path: "description", label: "description", click: true },
    { path: "submitter.user.username", label: "Tickets Author", click: true },
    {
      key: "actions",
      content: (ticket) => (
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

export default ProjectTicketsTable;
