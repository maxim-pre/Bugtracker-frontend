import Joi from "joi-browser";
import Form from "./common/form";
import { createTicket } from "../services/projectService";

class AddTicketForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      priority: "",
      type: "",
      developers: [],
    },
    errors: {},
  };

  schema = {
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    priority: Joi.string().required().label("Priority"),
    type: Joi.string().required().label("Type"),
    developers: Joi.array().min(1).required(),
  };

  doSubmit = async () => {
    const project_id = this.props.project_id;
    try {
      const token = localStorage.getItem("token");
      await createTicket(this.state.data, project_id, token);
      window.location.reload(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...ex.response.data };
        this.setState({ errors });
      }
    }
  };

  getdeveloperItems = (developers) => {
    const developerItems = [];
    for (var i = 0, l = developers.length; i < l; i++) {
      developerItems.push({
        value: developers[i].id,
        label: developers[i].user.username,
      });
    }
    return developerItems;
  };

  render() {
    const developerItems = this.getdeveloperItems(this.props.developers);
    return (
      <form action="" className="user">
        {this.renderInput("title", "Title")}
        {this.renderTextArea("description", "Description")}

        <div className="row">
          <div className="col">
            {this.renderSelectInput("priority", "Priority", [
              { value: "L", label: "Low" },
              { value: "M", label: "Medium" },
              { value: "H", label: "High" },
            ])}
          </div>
          <div className="col">
            {this.renderSelectInput("type", "Type", [
              { value: "I", label: "Issue" },
              { value: "B", label: "Bug" },
              { value: "FR", label: "Feature Request" },
            ])}
          </div>
        </div>
        {this.renderMultipleSelectInput(
          "developers",
          "Developers",
          developerItems
        )}
        {this.rederButton("create")}
      </form>
    );
  }
}

export default AddTicketForm;
