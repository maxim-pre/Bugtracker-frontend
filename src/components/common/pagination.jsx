import React, { Component } from "react";
import _ from "lodash";

const Pagination = ({ itemsCount, currentPage, pageSize, onPageChange }) => {
  const req_pages = Math.ceil(itemsCount / pageSize);
  if (req_pages === 1) return null;
  const pages = _.range(1, req_pages + 1); //going to be a list of integers up to 'req_pages'

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map((page) => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            onClick={() => onPageChange(page)}
          >
            <a className="page-link" href="#">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
  f;
};

export default Pagination;
