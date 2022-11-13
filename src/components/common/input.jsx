import React, { Component } from "react";

const Input = ({ value, name, onChange, label, error, type }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        className="form-control"
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
