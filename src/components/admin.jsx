import React, { Component } from "react";
import { getUsers, deleteUser } from "./../services/adminService";
import _ from "lodash";
import { toast } from "react-toastify";
import { paginate } from "./../utils/paginate";
import BasicCard from "./common/wrappers/basicCard";
import SearchBox from "./common/searchBox";
import Pagination from "./common/pagination";
import OrganisationTable from "./OrganisationTable";
import UpdateUserForm from "./updateUserForm";
import UserInfoCard from "./userInfoCard";
import UpdateUserStatusForm from "./updateUserStatusForm";

class Admin extends Component {
  state = {
    users: [],
    sortColumn: { path: "username", order: "asc" },
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
    currentSelectedDeveloper: null,
  };

  async componentDidMount() {
    const response = await getUsers(localStorage.getItem("token"));
    this.setState({ users: response.data });
  }

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleSelectDeveloper = (developer) => {
    if (developer === this.state.currentSelectedDeveloper)
      return this.setState({ currentSelectedDeveloper: null });
    this.setState({ currentSelectedDeveloper: developer });
  };

  handleDelete = async (user_id) => {
    const originalUsers = this.state.users;
    const users = originalUsers.filter((u) => u.id !== user_id);
    this.setState({ users });
    try {
      await deleteUser(user_id, localStorage.getItem("token"));
    } catch (ex) {
      if (ex.response && ex.response.status === 403)
        toast.error(ex.response.data.error);
      this.setState({ projects: originalUsers });
    }
  };

  getPagedData = () => {
    const {
      users: allUsers,
      sortColumn,
      currentPage,
      pageSize,
      searchQuery,
    } = this.state;
    let filtered = allUsers;
    if (searchQuery)
      filtered = allUsers.filter((u) =>
        u.username.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(
      filtered,
      [(user) => _.get(user, sortColumn.path).toLowerCase()],
      [sortColumn.order]
    );
    const users = paginate(sorted, currentPage, pageSize);
    return {
      count: filtered.length,
      data: users,
    };
  };
  render() {
    const { user } = this.props;
    const { data, count } = this.getPagedData();
    const {
      sortColumn,
      currentPage,
      pageSize,
      searchQuery,
      currentSelectedDeveloper,
    } = this.state;

    if (!user.is_staff)
      return (
        <h1 className="h3 mb-3 text-gray-800">
          You do not have admin permissions
        </h1>
      );
    return (
      <React.Fragment>
        <h1 className="h3 mb-3 text-gray-800">Admin panel</h1>
        <div className="row">
          <div className="col">
            <BasicCard
              header={
                <div className="d-sm-flex align-items-center">
                  <h6 className="m-0 font-weight-bold text-primary">
                    Organisation
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
                    <OrganisationTable
                      data={data}
                      onSort={this.handleSort}
                      sortColumn={sortColumn}
                      onSelect={this.handleSelectDeveloper}
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
          {currentSelectedDeveloper && (
            <div className="col-5">
              <UserInfoCard user={currentSelectedDeveloper} />
              {user.is_superuser && (
                <UpdateUserStatusForm user={currentSelectedDeveloper} />
              )}
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Admin;
