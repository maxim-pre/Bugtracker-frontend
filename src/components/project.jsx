import React, { Component } from "react";
import {
  DeleteComment,
  getProject,
  getProjectDevelopers,
} from "../services/projectService";
import { getProjectTickets } from "../services/projectService";
import _ from "lodash";
import withRouter from "../utils/withrouter";
import BasicCard from "./common/wrappers/basicCard";
import ProjectTicketsTable from "./projectTicketsTable";
import ProjectDevelopersTable from "./projectDeveloperTable";
import Pagination from "./common/pagination";
import { paginate } from "./../utils/paginate";
import DeveloperModal from "./common/modals/addDeveloperModal";
import { deleteDeveloper } from "./../services/projectService";
import { deleteTicket } from "../services/projectService";
import { getComments } from "../services/projectService";
import { toast } from "react-toastify";
import CreateTicketModal from "./common/modals/addTicketModal";
import UpdateTicketModal from "./common/modals/updateTicketModal";
import TicketInfoBox from "./ticketInfoBox";
import CommentForm from "./commentForm";
import CommentSection from "./common/commentSection";
import UpdateProjectDeveloperModal from "./common/modals/updateProjectDeveloperModal";
class Project extends Component {
  state = {
    project: {},
    developers: [],
    currentProjectDeveloper: {},
    tickets: [],
    ticketSortColumn: { path: "title", order: "asc" },
    developerSortColumn: { path: "developer.user.username", order: "asc" },
    currentDeveloperPage: 1,
    currentTicketPage: 1,
    pageSize: 4,
    developerModal: { show: false },
    ticketModal: { show: false },
    updateTicketModal: { ticket: null, show: false },
    updateDeveloperModal: { developer: null, show: false },
    currentSelectedTicket: null,
    comments: null,
  };

  async componentDidMount() {
    const project_id = this.props.params.project_id;
    //get the tickets
    //get the team members
    const token = localStorage.getItem("token");
    const { data: project } = await getProject(project_id, token);

    const { data: tickets } = await getProjectTickets(project_id, token);
    const { data: developers } = await getProjectDevelopers(project_id, token);
    const currentProjectDeveloper = developers.filter(
      (d) => d.developer.user.id === this.props.user.id
    );
    this.setState({
      tickets,
      developers,
      project,
      currentProjectDeveloper: currentProjectDeveloper[0],
    });
  }

  handleDeveloperPageChange = (page) => {
    this.setState({ currentDeveloperPage: page });
  };

  handleTicketPageChange = (page) => {
    this.setState({ currentTicketPage: page });
  };

  handleTicketSort = (ticketSortColumn) => {
    this.setState({ ticketSortColumn });
  };

  handleDeveloperSort = (developerSortColumn) => {
    this.setState({ developerSortColumn });
  };

  handleDeveloperDelete = async (developer) => {
    try {
      if (this.state.currentProjectDeveloper.admin_permission === false)
        return toast.error("you need admin permissions to perform this action");
    } catch {
      return toast.error("you do not have permission");
    }
    const project_id = this.state.project.id;
    const originalDevelopers = this.state.developers;
    const developers = originalDevelopers.filter(
      (d) => d.developer.id !== developer.developer.id
    );
    this.setState({ developers });
    try {
      await deleteDeveloper(
        project_id,
        developer.developer.id,
        localStorage.getItem("token")
      );
      toast.success(
        `${developer.developer.user.username} was kicked from the project`
      );
    } catch (ex) {
      if (ex.response.status === 403) toast.error(ex.response.data.error);
      this.setState({ developers: originalDevelopers });
    }
  };

  handleTicketDelete = async (ticket) => {
    const project_id = this.state.project.id;
    const originalTickets = this.state.tickets;
    const tickets = originalTickets.filter((t) => t.id !== ticket.id);
    this.setState({ tickets });
    try {
      await deleteTicket(project_id, ticket.id, localStorage.getItem("token"));
      toast.success(`Ticket with title ${ticket.title} was deleted`);
    } catch (ex) {
      if (ex.response.status === 403) toast.error(ex.response.data.error);
      this.setState({ tickets: originalTickets });
    }
  };

  handleUpdateTicket = (ticket) => {
    this.setState({ updateTicketModal: { ticket: ticket, show: true } });
  };

  handleSelectTicket = async (ticket) => {
    if (ticket === this.state.currentSelectedTicket)
      return this.setState({ currentSelectedTicket: null, comments: null });

    const { data: comments } = await getComments(
      this.state.project.id,
      ticket.id,
      localStorage.getItem("token")
    );

    this.setState({ currentSelectedTicket: ticket, comments });
  };

  handleModalClose = () => {
    this.setState({
      developerModal: { show: false },
      ticketModal: { show: false },
      updateTicketModal: { ticket: null, show: false },
      updateDeveloperModal: { developer: null, show: false },
    });
  };

  handleDeleteComment = async (comment) => {
    const project_id = this.state.project.id;
    const ticket_id = this.state.currentSelectedTicket.id;
    const originalComments = this.state.comments;
    const comments = originalComments.filter((c) => c.id !== comment.id);
    this.setState({ comments });
    try {
      await DeleteComment(
        project_id,
        ticket_id,
        comment.id,
        localStorage.getItem("token")
      );
    } catch (ex) {
      if (ex.response.status === 403) toast.error(ex.response.data.error);
      this.setState({ comments: originalComments });
    }
  };

  handleAddComment = (comments) => {
    this.setState({ comments });
  };

  handleActivateAddDeveloperModal = () => {
    try {
      if (this.state.currentProjectDeveloper.admin_permission === false)
        return toast.error("you need admin permissions to perform this action");
    } catch {
      return toast.error("you do not have permission");
    }
    return this.setState({
      developerModal: { show: true },
    });
  };

  handleActivateUpdateDeveloperModal = (developer) => {
    try {
      if (this.state.currentProjectDeveloper.admin_permission === false)
        return toast.error("you need admin permissions to perform this action");
    } catch {
      return toast.error("you do not have permission");
    }
    if (
      this.state.project.creator.user.username ===
      developer.developer.user.username
    )
      return toast.error("you cannot update the creator of the project");
    return this.setState({
      updateDeveloperModal: { developer: developer, show: true },
    });
  };

  getPagedData = () => {
    const {
      developers: allDevelopers,
      developerSortColumn,
      currentDeveloperPage,
      tickets: allTickets,
      currentTicketPage,
      ticketSortColumn,
      pageSize,
    } = this.state;

    const developersSorted = _.orderBy(
      allDevelopers,
      [(developer) => _.get(developer, developerSortColumn.path).toLowerCase()],
      [developerSortColumn.order]
    );
    const ticketsSorted = _.orderBy(
      allTickets,
      [(ticket) => _.get(ticket, ticketSortColumn.path).toLowerCase()],
      [ticketSortColumn.order]
    );

    const developers = paginate(
      developersSorted,
      currentDeveloperPage,
      pageSize
    );
    const tickets = paginate(ticketsSorted, currentTicketPage, pageSize);
    return {
      devCount: allDevelopers.length,
      devData: developers,
      tickCount: allTickets.length,
      tickData: tickets,
    };
  };

  render() {
    const {
      developers,
      project,
      developerSortColumn,
      currentDeveloperPage,
      ticketSortColumn,
      currentTicketPage,
      pageSize,
      developerModal,
      ticketModal,
      updateDeveloperModal,
      updateTicketModal,
      currentSelectedTicket,
      comments,
    } = this.state;

    const { devCount, devData, tickCount, tickData } = this.getPagedData();
    return (
      <React.Fragment>
        <h1 className="h3 mb-2 text-gray-800">{project.name}</h1>
        <p className="mb-4 wrap-text">{`description: ${project.description}`}</p>
        <div className="row">
          <div className="col">
            <BasicCard
              header={
                <div className="d-sm-flex align-items-center">
                  <h6 className="m-0 font-weight-bold text-primary">Team</h6>
                  <button
                    className="btn btn-primary btn-sm create-button"
                    onClick={this.handleActivateAddDeveloperModal}
                  >
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
                      onSort={this.handleDeveloperSort}
                      onDelete={this.handleDeveloperDelete}
                      onUpdate={this.handleActivateUpdateDeveloperModal}
                      project_id={project.id}
                    />
                  </div>
                  <hr />
                  <div className="project-pagination">
                    <Pagination
                      itemsCount={devCount}
                      currentPage={currentDeveloperPage}
                      pageSize={pageSize}
                      onPageChange={this.handleDeveloperPageChange}
                    />
                  </div>
                </div>
              }
            />
          </div>
          <div className="col">
            <BasicCard
              header={
                <div className="d-sm-flex align-items-center">
                  <h6 className="m-0 font-weight-bold text-primary">Tickets</h6>
                  <button
                    className="btn btn-primary btn-sm create-button"
                    onClick={() =>
                      this.setState({ ticketModal: { show: true } })
                    }
                  >
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
                      onSort={this.handleTicketSort}
                      project_id={project.id}
                      onDelete={this.handleTicketDelete}
                      onUpdate={this.handleUpdateTicket}
                      onSelect={this.handleSelectTicket}
                    />
                  </div>
                  <div className="project-pagination">
                    <Pagination
                      itemsCount={tickCount}
                      currentPage={currentTicketPage}
                      pageSize={pageSize}
                      onPageChange={this.handleTicketPageChange}
                    />
                  </div>
                </div>
              }
            />
          </div>
          {currentSelectedTicket && (
            <div className="row mb-2">
              <div className="col-7">
                <TicketInfoBox ticket={currentSelectedTicket} />
              </div>
              <div className="col">
                <BasicCard
                  header={
                    <h6 className="m-0 font-weight-bold text-primary">
                      Comments
                    </h6>
                  }
                  body={
                    <div className="m-3">
                      <CommentSection
                        comments={comments}
                        onDelete={this.handleDeleteComment}
                      />
                      <CommentForm
                        project_id={project.id}
                        ticket_id={currentSelectedTicket.id}
                        onCreateComment={this.handleAddComment}
                      />
                    </div>
                  }
                />
              </div>
            </div>
          )}
        </div>
        <DeveloperModal
          show={developerModal.show}
          onClose={this.handleModalClose}
          project_id={project.id}
        />
        <UpdateProjectDeveloperModal
          show={updateDeveloperModal.show}
          onClose={this.handleModalClose}
          project_id={project.id}
          developer={updateDeveloperModal.developer}
        />
        <CreateTicketModal
          show={ticketModal.show}
          onClose={this.handleModalClose}
          developers={developers}
          project_id={project.id}
        />
        <UpdateTicketModal
          show={updateTicketModal.show}
          onClose={this.handleModalClose}
          developers={developers}
          project_id={project.id}
          ticket={updateTicketModal.ticket}
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Project);
