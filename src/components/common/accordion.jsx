import React, { Component } from "react";

class Accordion extends Component {
  items = [
    {
      title: "Priority",
      options: ["Low", "Medium", "High"],
      onChange: this.props.onPriorityChange,
    },
    {
      title: "Type",
      options: ["Bug", "Issue", "Feature Request"],
      onChange: this.props.onTypeChange,
    },
    {
      title: "Status",
      options: ["Option", "Started", "Closed"],
      onChange: this.props.onStatusChange,
    },
  ];
  render() {
    return (
      <div class="accordion" id="accordionExample">
        {this.items.map((item) => (
          <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne">
              <button
                class="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                {item.title}
              </button>
            </h2>
            <div
              id="collapseOne"
              class="accordion-collapse collapse show"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div class="accordion-body"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Accordion;
