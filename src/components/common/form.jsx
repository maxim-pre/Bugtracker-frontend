import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import TextArea from "./textArea";
import SelectInput from "./selectInput";
import MultipleSelectInput from "./multipleSelectInput";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    // will return an errors object or null if there are no errors
    const options = { abortEarly: false };
    const result = Joi.validate(this.state.data, this.schema, options);
    if (!result.error) return null;

    const errors = {};
    for (let item of result.error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleArrayChange = ({ currentTarget: input }) => {
    const data = { ...this.state.data };
    const options = input.options;
    const new_data = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        new_data.push(options[i].value);
      }
    }
    data[input.name] = new_data;
    this.setState({ data });
  };

  rederButton = (label) => {
    return (
      <button
        disabled={this.validate()}
        className="btn btn-primary btn-user btn-block"
        onClick={this.handleSubmit}
      >
        {label}
      </button>
    );
  };

  renderInput(name, label, type = "text", placeholder = null) {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      />
    );
  }

  renderTextArea(name, label, placeholder) {
    const { data, errors } = this.state;
    return (
      <TextArea
        name={name}
        value={data[name]}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        placeholder={placeholder}
      />
    );
  }

  renderSelectInput(name, label, items, currentSelect) {
    const { errors } = this.state;
    return (
      <SelectInput
        name={name}
        label={label}
        items={items}
        onChange={this.handleChange}
        currentSelect={currentSelect}
        error={errors[name]}
      />
    );
  }

  renderMultipleSelectInput(name, label, items, currentSelected) {
    const { errors } = this.state;
    return (
      <MultipleSelectInput
        name={name}
        label={label}
        items={items}
        onChange={this.handleArrayChange}
        currentSelected={currentSelected}
        error={errors[name]}
      />
    );
  }
}

export default Form;
