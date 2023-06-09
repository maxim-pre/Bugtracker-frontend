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

  getRowClass = () => {
    return this.props.clickable ? "table-row clickable" : "table-row";
  };

  render() {
    const { data, columns, onSelect } = this.props;
    return (
      <tbody className="table-group-divider">
        {data.map((item) => (
          <tr key={item.id} className={this.getRowClass()}>
            {columns.map((column) => (
              <td
                onClick={column.click ? () => onSelect(item) : null}
                key={this.createKey(item, column)}
                className={
                  column.textClass
                    ? column.textClass
                    : "text-left text-xs text-gray-900"
                }
              >
                <div className={column.cellClass}>
                  {this.renderCell(item, column)}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
