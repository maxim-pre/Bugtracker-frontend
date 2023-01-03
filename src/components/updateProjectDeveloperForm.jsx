import Joi from "joi-browser";
import Form from "./common/form";
import { updateProjectDeveloper } from "../services/projectService";

class UpdateProjectDeveloperForm extends Form {
  state = {
    data: {
      admin_permission: "False",
      role: "Developer",
    },
    errors: {},
  };

  schema = {
    admin_permission: Joi.string().required().label("Admin Permission"),
    role: Joi.string().required().label("Role"),
  };

  doSubmit = async () => {
    const project_id = this.props.project_id;
    const id = this.props.developer.id;
    console.log(this.state.data);
    try {
      await updateProjectDeveloper(
        project_id,
        id,
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
        {this.renderSelectInput("admin_permission", "Give admin permissions", [
          { value: "False", label: "No" },
          { value: "True", label: "Yes" },
        ])}
        {this.renderSelectInput("role", "Role", [
          { value: "Developer", label: "Developer" },
          { value: "Submitter", label: "Sumbitter" },
          { value: "Project Manager", label: "Project Manager" },
          { value: "Admin", label: "Admin" },
        ])}
        {this.rederButton("Update")}
      </form>
    );
  }
}

export default UpdateProjectDeveloperForm;
