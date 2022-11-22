import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (item, column) => {
    return _.get(item, column.path);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody className="table-group-divider">
        {data.map((item) => (
          <tr key={item.id}>
            {columns.map((column) => (
              <td className="text-left">{this.renderCell(item, column)}</td>
            ))}
            <td className="text-left">{item.name}</td>
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
