import React, { Component } from "react";

const TextArea = ({
  value,
  name,
  onChange,
  label,
  error,
  type,
  placeholder,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        className="form-control"
        type={type}
        id={name}
        name={name}
        onChange={onChange}
        value={value}
        rows="3"
        placeholder={placeholder}
      ></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextArea;
