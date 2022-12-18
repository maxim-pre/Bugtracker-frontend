import React, { Component } from "react";
import { getTickets } from "../services/projectService";
import BasicCard from "./common/wrappers/basicCard";
import TicketTable from "./ticketsTable";
import Pagination from "./common/pagination";
import _ from "lodash";
import { paginate } from "./../utils/paginate";
import SearchBox from "./common/searchBox";

class Tickets extends Component {
  state = {
    tickets: [],
    ticketSortColumn: { path: "title", order: "asc" },
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
  };

  async componentDidMount() {
    const { data: tickets } = await getTickets(localStorage.getItem("token"));
    this.setState({ tickets });
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
      </React.Fragment>
    );
  }
}

export default Tickets;
