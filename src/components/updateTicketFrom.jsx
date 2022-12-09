import Joi from "joi-browser";
import Form from "./common/form";
import { updateTicket } from "../services/projectService";
import { toast } from "react-toastify";

class EditTicketForm extends Form {
  state = {
    data: {
      title: "",
      description: "",
      priority: "",
      type: "",
      status: "",
      developers: [],
    },
    errors: {},
  };

  componentDidMount() {
    const { title, description, status, type, priority } = this.props.ticket;
    const data = {
      title: title,
      description: description,
      priority: priority,
      type: type,
      status: status,
      developers: [],
    };
    this.setState({ data });
  }

  schema = {
    title: Joi.string().required().label("Title"),
    description: Joi.string().required().label("Description"),
    priority: Joi.string().required().label("Priority"),
    status: Joi.string().required().label("Status"),
    type: Joi.string().required().label("Type"),
    developers: Joi.array(),
  };

  doSubmit = async () => {
    const { ticket, project_id } = this.props;
    try {
      await updateTicket(
        project_id,
        ticket.id,
        this.state.data,
        localStorage.getItem("token")
      );
      window.location.reload(false);
    } catch (ex) {
      console.log(ex);
      if (ex.response && ex.response.status === 403)
        toast.error(ex.response.data.error);
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
            {this.renderSelectInput(
              "priority",
              "Priority",
              [
                { value: "L", label: "Low" },
                { value: "M", label: "Medium" },
                { value: "H", label: "High" },
              ],
              this.state.data.priority
            )}
          </div>
          <div className="col">
            {this.renderSelectInput(
              "type",
              "Type",
              [
                { value: "I", label: "Issue" },
                { value: "B", label: "Bug" },
                { value: "FR", label: "Feature Request" },
              ],
              this.state.data.type
            )}
          </div>
          <div className="col">
            {this.renderSelectInput(
              "status",
              "Status",
              [
                { value: "O", label: "Open" },
                { value: "S", label: "Started" },
                { value: "C", label: "Closed" },
              ],
              this.state.data.status
            )}
          </div>
        </div>
        {this.renderMultipleSelectInput(
          "developers",
          "Developers",
          developerItems
        )}
        {this.rederButton("Update")}
      </form>
    );
  }
}

export default EditTicketForm;
