import React, { Component } from "react";
import { getTickets } from "../services/projectService";
import BasicCard from "./common/wrappers/basicCard";
import TicketTable from "./ticketsTable";
import Pagination from "./common/pagination";
import _ from "lodash";
import { paginate } from "./../utils/paginate";
import SearchBox from "./common/searchBox";
import { PieChart } from "recharts";
import SimplePieChart from "./common/pieChart";

class Tickets extends Component {
  state = {
    tickets: [],
    ticketSortColumn: { path: "title", order: "asc" },
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    chartData: [],
  };

  async componentDidMount() {
    const { data: tickets } = await getTickets(localStorage.getItem("token"));
    const data = this.getChartData(tickets);
    this.setState({ tickets, chartData: data });
  }

  handleTicketSort = (ticketSortColumn) => {
    this.setState({ ticketSortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  getChartData = (tickets) => {
    const data = {
      statusData: [
        {
          name: "open",
          value: tickets.filter((t) => t.status === "open").length,
        },
        {
          name: "started",
          value: tickets.filter((t) => t.status === "started").length,
        },
        {
          name: "closed",
          value: tickets.filter((t) => t.status === "closed").length,
        },
      ],
      typeData: [
        {
          name: "issue",
          value: tickets.filter((t) => t.type === "issue").length,
        },
        { name: "bug", value: tickets.filter((t) => t.type === "bug").length },
        {
          name: "feature request",
          value: tickets.filter((t) => t.type === "feature request").length,
        },
      ],
      priorityData: [
        {
          name: "low",
          value: tickets.filter((t) => t.priority === "low").length,
        },
        {
          name: "medium",
          value: tickets.filter((t) => t.priority === "medium").length,
        },
        {
          name: "high",
          value: tickets.filter((t) => t.priority === "high").length,
        },
      ],
    };
    return data;
  };

  getPagedData = () => {
    const {
      tickets: allTickets,
      ticketSortColumn,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;

    let filtered = allTickets;
    if (searchQuery)
      filtered = allTickets.filter((t) =>
        t.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const ticketsSorted = _.orderBy(
      filtered,
      [(ticket) => _.get(ticket, ticketSortColumn.path).toLowerCase()],
      [ticketSortColumn.order]
    );

    const tickets = paginate(ticketsSorted, currentPage, pageSize);
    return {
      count: allTickets.length,
      data: tickets,
    };
  };
  render() {
    const { ticketSortColumn, currentPage, pageSize, searchQuery } = this.state;
    const { data, count } = this.getPagedData();
    return (
      <React.Fragment>
        <h1 className="h3 mb-3 text-gray-800">Tickets</h1>
        <div className="row">
          <div className="col">
            <BasicCard
              header={
                <div className="d-sm-flex align-items-center">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Assigned tickets
                  </h6>
                  <div className="col-3 ml-auto">
                    <SearchBox
                      value={searchQuery}
                      onChange={this.handleSearch}
                    />
                  </div>
                </div>
              }
              body={
                <React.Fragment>
                  <div className="table-responsive">
                    <TicketTable
                      data={data}
                      onSort={this.handleTicketSort}
                      sortColumn={ticketSortColumn}
                    />
                  </div>
                  <div className="project-pagination">
                    <Pagination
                      itemsCount={count}
                      currentPage={currentPage}
                      pageSize={pageSize}
                      onPageChange={this.handlePageChange}
                    />
                  </div>
                </React.Fragment>
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <BasicCard
              header={
                <h6 className="m-0 font-weight-bold text-primary">
                  Tickets by type
                </h6>
              }
              body={
                <div className="mb-3">
                  <SimplePieChart data={this.state.chartData.typeData} />
                </div>
              }
            />
          </div>
          <div className="col">
            <BasicCard
              header={
                <h6 className="m-0 font-weight-bold text-primary">
                  Tickets by status
                </h6>
              }
              body={
                <div className="mb-3">
                  <SimplePieChart data={this.state.chartData.statusData} />
                </div>
              }
            />
          </div>
          <div className="col">
            <BasicCard
              header={
                <h6 className="m-0 font-weight-bold text-primary">
                  Tickets by priority
                </h6>
              }
              body={
                <div className="mb-3">
                  <SimplePieChart data={this.state.chartData.priorityData} />
                </div>
              }
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Tickets;
