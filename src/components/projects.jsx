import React, { Component } from "react";
import { getProjects } from "../services/projectService";
import { paginate } from "../utils/paginate";
import BasicCard from "./common/wrappers/basicCard";
import Pagination from "./common/pagination";
import ProjectTable from "./projectsTable";
import ListGroup from "./common/listGroup";
import { Link } from "react-router-dom";
import _ from "lodash";

class Projects extends Component {
  state = {
    projects: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "name", order: "asc" },
    listgroup: [
      { name: "All Projects", id: "" },
      { name: "Your Projects", id: "1" },
      { name: "Shared with you", id: "2" },
    ],
    currentListGroup: { name: "All Projects", id: "" },
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

  handleListGroupChange = (item) => {
    this.setState({ currentListGroup: item, currentPage: 1 });
    console.log(this.state.currentListGroup);
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
    const { currentPage, pageSize, sortColumn, listgroup, currentListGroup } =
      this.state;
    const { count, data } = this.getPagedData();
    return (
      <React.Fragment>
        <BasicCard
          header={
            <div className="d-sm-flex align-items-center justify-content-between">
              <h4>My Projects</h4>
              <Link to={"/createproject"} className="btn-sm btn-primary">
                New Project
              </Link>
            </div>
          }
          body={
            <div className="row">
              <div className="col-2">
                <ListGroup
                  items={listgroup}
                  currentItem={currentListGroup}
                  onChange={this.handleListGroupChange}
                />
              </div>
              <div className="col table-responsive">
                <ProjectTable
                  data={data}
                  sortColumn={sortColumn}
                  onSort={this.handleSort}
                />
              </div>
              <hr />
              <Pagination
                itemsCount={count}
                currentPage={currentPage}
                pageSize={pageSize}
                onPageChange={this.handlePageChange}
              />
            </div>
          }
        />
      </React.Fragment>
    );
  }
}

export default Projects;
