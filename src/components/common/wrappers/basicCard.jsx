import React, { Component } from "react";

const BasicCard = (props) => {
  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 className="m-0 font-weight-bold text-primary"> My Projects</h6>
      </div>
      <div class="card-body text-center">{props.body}</div>
    </div>
  );
};

export default BasicCard;
