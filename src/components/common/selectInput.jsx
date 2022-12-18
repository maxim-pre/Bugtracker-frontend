import React, { Component } from "react";

const SelectInput = ({
  items,
  name,
  label,
  onChange,
  currentSelect,
  error,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select className="form-select" name={name} id={name} onChange={onChange}>
        <option value="" selected disabled hidden></option>
        {items.map((item) => (
          <option
            value={item.value}
            selected={item.value === currentSelect ? true : false}
          >
            {item.label}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default SelectInput;
