import React, { Component } from "react";
import { getProjects } from "../services/projectService";
import { deleteProject } from "../services/projectService";
import { paginate } from "../utils/paginate";
import BasicCard from "./common/wrappers/basicCard";
import Pagination from "./common/pagination";
import ProjectTable from "./projectsTable";
import DropDownLink from "./common/dropdownLink";
import UpdateProjectModal from "./common/modals/updateProjectModal";
import CreateProjectModal from "./common/modals/createProjectModal";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
class Projects extends Component {
  state = {
    projects: [],
    currentPage: 1,
    pageSize: 6,
    sortColumn: { path: "name", order: "asc" },
    listgroup: [
      { name: "All Projects", id: "" },
      { name: "Your Projects", id: "1" },
      { name: "Shared with you", id: "2" },
    ],
    currentListGroup: { name: "All Projects", id: "" },
    updateModal: { project: null, show: false },
    createModal: { show: false },
  };

  async componentDidMount() {
    try {
      const { data } = await getProjects(localStorage.getItem("token"));
      const projects = [...data];
      this.setState({ projects });
    } catch (ex) {}
  }

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleDelete = async (project) => {
    const originalProjects = this.state.projects;
    const projects = originalProjects.filter((p) => p.id !== project.id);
    this.setState({ projects });
    try {
      await deleteProject(project.id, localStorage.getItem("token"));
    } catch (ex) {
      if (ex.response && ex.response.status === 403)
        toast.error(ex.response.data.error);
      this.setState({ projects: originalProjects });
    }
  };

  handleUpdate = (project) => {
    this.setState({ updateModal: { project: project, show: true } });
  };

  handleModalClose = () => {
    this.setState({
      updateModal: { project: null, show: false },
      createModal: { show: false },
    });
  };

  handleListGroupChange = (item) => {
    this.setState({ currentListGroup: item, currentPage: 1 });
  };

  getFilteredProjects = (allProjects, currentListGroup, user) => {
    if (currentListGroup.id === "1") {
      return allProjects.filter(
        (p) => p.creator.user.username === user.username
      );
    }
    if (currentListGroup.id === "2") {
      return allProjects.filter(
        (p) => p.creator.user.username !== user.username
      );
    }
    return allProjects;
  };

  getPagedData = () => {
    const {
      projects: allProjects,
      currentPage,
      pageSize,
      sortColumn,
      currentListGroup,
    } = this.state;

    const { user } = this.props;

    const filtered =
      currentListGroup &&
      this.getFilteredProjects(allProjects, currentListGroup, user);

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const projects = paginate(sorted, currentPage, pageSize);

    return { count: filtered.length, data: projects };
  };

  render() {
    const {
      currentPage,
      pageSize,
      sortColumn,
      listgroup,
      updateModal,
      createModal,
    } = this.state;
    const { count, data } = this.getPagedData();
    return (
      <React.Fragment>
        <h1 className="h3 mb-3 text-gray-800">Dashboard</h1>
        <BasicCard
          header={
            <div className="d-sm-flex align-items-center">
              <h6 className="m-0 font-weight-bold text-primary">My Projects</h6>
              <div className="filter-button">
                <DropDownLink
                  items={listgroup}
                  onChange={this.handleListGroupChange}
                  className={"btn btn-secondary btn-sm dropdown-toggle"}
                  label={"Filters"}
                />
              </div>
              <button
                className="btn btn-primary btn-sm create-button"
                onClick={() => this.setState({ createModal: { show: true } })}
              >
                New Project
              </button>
            </div>
          }
          body={
            <div className="row">
              <div className="col table-responsive">
                <ProjectTable
                  data={data}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                  onDelete={this.handleDelete}
                  onUpdate={this.handleUpdate}
                />
              </div>
              <hr />
              <div className="project-pagination">
                <Pagination
                  itemsCount={count}
                  currentPage={currentPage}
                  pageSize={pageSize}
                  onPageChange={this.handlePageChange}
                />
              </div>
            </div>
          }
        />
        <CreateProjectModal
          show={createModal.show}
          onClose={this.handleModalClose}
        />
        <UpdateProjectModal
          show={updateModal.show}
          project={updateModal.project}
          onClose={this.handleModalClose}
        />
      </React.Fragment>
    );
  }
}

export default Projects;
