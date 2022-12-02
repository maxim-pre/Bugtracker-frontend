import React, { Component } from "react";
import { getProjectDevelopers } from "../services/projectService";
import { getProjectTickets } from "../services/projectService";
import _ from "lodash";
import withRouter from "../utils/withrouter";
import BasicCard from "./common/wrappers/basicCard";
import ProjectTicketsTable from "./projectTicketsTable";
import ProjectDevelopersTable from "./projectDeveloperTable";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
class Project extends Component {
  state = {
    developers: [],
    tickets: [],
    ticketSortColumn: { path: "title", order: "asc" },
    developerSortColumn: { path: "user", order: "asc" },
    currentDeveloperPage: 1,
    currentTicketPage: 1,
    pageSize: 4,
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

  handleDeveloperPageChange = (page) => {
    this.setState({ currentDeveloperPage: page });
  };

  handleTicketPageChange = (page) => {
    this.setState({ currentTicketPage: page });
  };

  getPagedData = () => {
    const {
      developers: allDevelopers,
      currentDeveloperPage,
      tickets: allTickets,
      currentTicketPage,
      pageSize,
    } = this.state;

    const developers = paginate(allDevelopers, currentDeveloperPage, pageSize);
    const tickets = paginate(allTickets, currentTicketPage, pageSize);
    return {
      devCount: allDevelopers.length,
      devData: developers,
      tickCount: allTickets.length,
      tickData: tickets,
    };
  };

  render() {
    const {
      tickets,
      developerSortColumn,
      currentDeveloperPage,
      ticketSortColumn,
      currentTicketPage,
      pageSize,
    } = this.state;

    const { devCount, devData, tickCount, tickData } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <BasicCard
              header={
                <div className="d-sm-flex align-items-center">
                  <h4 className="header h3 mb-0 text-gray-800">Team</h4>
                  <button className="btn btn-primary btn-sm create-button">
                    New Member
                  </button>
                </div>
              }
              body={
                <div className="row">
                  <div className="table-responsive">
                    <ProjectDevelopersTable
                      data={devData}
                      sortColumn={developerSortColumn}
                    />
                  </div>
                  <hr />
                  <Pagination
                    itemsCount={devCount}
                    currentPage={currentDeveloperPage}
                    pageSize={pageSize}
                    onPageChange={this.handleDeveloperPageChange}
                  />
                </div>
              }
            />
          </div>
          <div className="col">
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
                <div className="row">
                  <div className="table-responsive">
                    <ProjectTicketsTable
                      data={tickData}
                      sortColumn={ticketSortColumn}
                    />
                  </div>
                  <Pagination
                    itemsCount={tickCount}
                    currentPage={currentTicketPage}
                    pageSize={pageSize}
                    onPageChange={this.handleTicketPageChange}
                  />
                </div>
              }
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Project);
