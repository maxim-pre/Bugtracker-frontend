import React, { Component } from "react";

const TableHeader = ({ columns }) => {
  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th className="text-left" scope="col">
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
