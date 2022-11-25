import React, { Component } from "react";
import { getProjects } from "../services/projectService";
import { paginate } from "../utils/paginate";
import BasicCard from "./common/wrappers/basicCard";
import Table from "./common/table";
import Pagination from "./common/pagination";
import TableHeader from "./common/tableHeader";
import ProjectTable from "./projectsTable";

class Projects extends Component {
  state = {
    projects: [],
    currentPage: 1,
    pageSize: 4,
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

  getPagedData = () => {
    const { projects: allProjects, currentPage, pageSize } = this.state;

    const projects = paginate(allProjects, currentPage, pageSize);

    return { count: allProjects.length, data: projects };
  };

  render() {
    const { currentPage, pageSize, currentProject } = this.state;
    const { count, data } = this.getPagedData();
    return (
      <React.Fragment>
        <BasicCard
          header={"My Projects"}
          body={
            <div className="table-responsive">
              <ProjectTable data={data} />
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
