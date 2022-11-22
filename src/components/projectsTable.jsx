import React, { Component } from "react";
import { getProjects } from "../services/projectService";
import { link } from "react-router-dom";
import { paginate } from "../utils/paginate";
import BasicCard from "./common/wrappers/basicCard";
import Table from "./common/table";
import Pagination from "./common/pagination";
import CreateProjectForm from "./createProjectFrom";
class ProjectTable extends Component {
  state = {
    projects: [],
    currentPage: 1,
    pageSize: 4,
  };

  columns = [
    { path: "name", label: "Title" },
    { path: "description", label: "Description" },
    { path: "creator", label: "Creator" },
    { path: "date_created", label: "Date Created" },
  ];

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

  getPagedData = () => {
    const { projects: allProjects, currentPage, pageSize } = this.state;

    const projects = paginate(allProjects, currentPage, pageSize);

    return { count: allProjects.length, data: projects };
  };

  render() {
    const { currentPage, pageSize } = this.state;
    const headers = ["Name", "Description", "Creator", "Date Created"];
    const { count, data } = this.getPagedData();
    return (
      <React.Fragment>
        <BasicCard
          header={"My Projects"}
          body={
            <div className="table-responsive">
              <Table columns={this.columns} data={data} />
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

export default ProjectTable;
