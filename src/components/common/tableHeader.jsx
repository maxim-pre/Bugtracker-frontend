import React, { Component } from "react";

class TableHeader extends Component {
  raiseSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path)
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    return this.props.onSort(sortColumn);
  };

  renderSortIcon = (column) => {
    const sortColumn = this.props.sortColumn;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i class="fa fa-sort-asc" />;
    return <i class="fa fa-sort-desc" />;
  };

  render() {
    const { columns } = this.props;
    return (
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.label}
              onClick={() => this.raiseSort(column.path)}
              className={"text-left text-xs"}
              scope="col"
            >
              {column.label} {this.renderSortIcon(column)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
