import React, { Component } from "react";
import { getProjectDevelopers } from "../services/projectService";
import withRouter from "../utils/withrouter";
import DeveloperTable from "./projectDeveloperTable";
class Project extends Component {
  state = {};

  async componentDidMount() {
    const id = this.props.params.project_id;
    //get the tickets
    //get the team members
    const { data } = await getProjectDevelopers(
      id,
      localStorage.getItem("token")
    );
    const developers = [...data];
    console.log(developers);
    this.setState({ developers });
  }

  render() {
    return <h1>jojfijo</h1>;
  }
}

export default withRouter(Project);
