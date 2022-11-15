import React, { Component } from "react";
import { getProjects } from "../services/projectService";
class ProjectTable extends Component {
  state = {
    projects: [],
  };

  async componentDidMount() {
    const { data } = await getProjects();
    const projects = [...data];
    this.setState({ projects });
  }

  render() {
    return (
      <React.Fragment>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Creator</th>
              <th>Date Created</th>
            </tr>
          </thead>
          <tbody>
            {this.state.projects.map((p) => (
              <tr>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.creator}</td>
                <td>{p.date_created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default ProjectTable;
