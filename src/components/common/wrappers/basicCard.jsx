import React, { Component } from "react";

const BasicCard = (props) => {
  return (
    <div className="card shadow mb-4">
      <div className="card-header py-3">{props.header}</div>
      <div className="card-body text-center">{props.body}</div>
    </div>
  );
};

export default BasicCard;
