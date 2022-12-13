import React, { Component } from "react";
import _ from "lodash";
class TicketInfoBox extends Component {
  getStatusOptions = (att) => {
    if (att === "O") return "Open";
    if (att === "S") return "Started";
    if (att === "C") return "Closed";
    return null;
  };
  getPriorityOptions = (att) => {
    if (att === "L") return "Low";
    if (att === "M") return "Medium";
    if (att === "H") return "High";
    return null;
  };
  getTypeOptions = (att) => {
    if (att === "B") return "Bug";
    if (att === "I") return "Issue";
    if (att === "FR") return "Feature Request";
    return null;
  };
  render() {
    const { ticket } = this.props;

    return (
      <div className="card mb-4">
        <div className="card-header">
          <h6 className="m-0 text-primary font-weight-bold">
            Selected Ticket Info
          </h6>
        </div>
        <div className="card-body">
          <div className="row mb-2">
            <div className="col">
              <div className="text-xs">Ticket Title</div>
              <div className="m-0 text-primary wrap-text">{ticket.title}</div>
            </div>
            <div className="col text-center">
              <div className="text-xs">Author</div>
              <div className="m-0 wrap-text">
                {ticket.submitter.user.username}
              </div>
            </div>
            <div className="col-6">
              <div className="text-xs">Description</div>
              <div className="m-0 text-xs wrap-text">{ticket.description}</div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="text-xs">Status</div>
              <div className="m-0 text-xs text-primary wrap-text">
                {this.getStatusOptions(ticket.status)}
              </div>
            </div>
            <div className="col text-center">
              <div className="text-xs">Priority</div>
              <div className="m-0 text-xs text-primary wrap-text">
                {this.getPriorityOptions(ticket.priority)}
              </div>
            </div>
            <div className="col-6">
              <div className="text-xs">Type</div>
              <div className="m-0 text-xs text-primary wrap-text">
                {this.getTypeOptions(ticket.type)}
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <div className="text-xs">Assigned Developers</div>
          <div>
            {ticket.developers.map((dev) => (
              <div className="">{_.get(dev, "developer.user.username")}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default TicketInfoBox;
