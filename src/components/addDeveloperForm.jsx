import Joi from "joi-browser";
import Form from "./common/form";
import { addDeveloper } from "../services/projectService";

class AddDeveloperForm extends Form {
  state = {
    data: {
      username: "",
      role: "Developer",
    },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    role: Joi.string().required().label("Role"),
  };

  doSubmit = async () => {
    const project_id = this.props.project_id;
    try {
      await addDeveloper(
        project_id,
        this.state.data,
        localStorage.getItem("token")
      );
      window.location.href = `/projects/${project_id}`;
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...ex.response.data };
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <form action="" className="user">
        {this.renderInput("username", "Username")}
        {this.renderSelectInput("role", "Role", [
          { value: "Developer", label: "Developer" },
          { value: "Submitter", label: "Sumbitter" },
          { value: "Project Manager", label: "Project Manager" },
          { value: "Admin", label: "Admin" },
        ])}
        {this.rederButton("Add")}
      </form>
    );
  }
}

export default AddDeveloperForm;
