import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    if (column.content) return column.content(item);

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    return item.id + (column.path || column.key);
  };

  selectRow = (item) => {
    return (window.location.href = `/projects/${item.id}`);
  };

  getRowClass = () => {
    return this.props.clickable ? "table-row clickable" : "table-row";
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody className="table-group-divider">
        {data.map((item) => (
          <tr key={item.id} className={this.getRowClass()}>
            {columns.map((column) => (
              <td
                onClick={column.click ? () => this.selectRow(item) : null}
                key={this.createKey(item, column)}
                className={
                  column.className
                    ? column.className
                    : "text-left text-xs font-weight-bold"
                }
              >
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
