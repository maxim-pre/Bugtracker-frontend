import React, { Component } from "react";

class CreateTicketForm extends Component {
  state = {
    data: {
      name: "",
      description: "",
    },
    errors: {},
  };

  schema = {
    name: Joi.string().required().label("Name"),
    description: Joi.string().required().label("Description"),
  };

  render() {
    return null;
  }
}

export default CreateTicketForm;
