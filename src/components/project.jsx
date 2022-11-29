import React, { Component } from "react";
import { getProjectDevelopers } from "../services/projectService";
import { getProjectTickets } from "../services/projectService";
import withRouter from "../utils/withrouter";
import BasicCard from "./common/wrappers/basicCard";
import ProjectTicketsTable from "./projectTicketsTable";
class Project extends Component {
  state = {
    developers: [],
    tickets: [],
    ticketSortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const project_id = this.props.params.project_id;
    //get the tickets
    //get the team members

    const { data } = await getProjectTickets(
      project_id,
      localStorage.getItem("token")
    );
    const tickets = [...data];
    const { data: developers } = await getProjectDevelopers(
      project_id,
      localStorage.getItem("token")
    );
    this.setState({ tickets, developers });
  }
  render() {
    return (
      <BasicCard
        header={
          <div className="d-sm-flex align-items-center">
            <h4 className="header h3 mb-0 text-gray-800">Tickets</h4>

            <button className="btn btn-primary btn-sm create-button">
              New Ticket
            </button>
          </div>
        }
        body={
          <ProjectTicketsTable
            data={this.state.tickets}
            sortColumn={this.state.ticketSortColumn}
          />
        }
      />
    );
  }
}

export default withRouter(Project);
