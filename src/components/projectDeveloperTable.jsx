import userEvent from "@testing-library/user-event";
import React, { Component } from "react";
import Table from "./common/table";

class DeveloperTable extends Component {
  columns = [
    { path: "user.username", label: "Username" },
    { path: "user.email", label: "Email" },
    { path: "user.phone", label: "Phone Number" },
  ];
  render() {
    const { data } = this.props;
    return <Table columns={this.columns} data={data} />;
  }
}

export default DeveloperTable;
