//this file will abstract away the table header component so that
//the table can be used for movies, customers or other data

import React, { Component } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortAsc, faSortDesc } from "@fortawesome/free-solid-svg-icons";

//what the interface of this table header looks like
// columns: array
// sortColumn: object
// onSort: function

class TableHeader extends Component {
  raiseSort = (path) => {
    const l_sortColumnObj = { ...this.props.sortColumn };
    l_sortColumnObj.order =
      l_sortColumnObj.pathToTargetProp === path
        ? l_sortColumnObj.order === "asc"
          ? "desc"
          : "asc"
        : (l_sortColumnObj.pathToTargetProp = path);
    this.props.onSort(l_sortColumnObj);
  };

  renderSortIcon = (column) => {
    if (column.path) {
      if (column.path !== this.props.sortColumn.pathToTargetProp) return null;
      if (this.props.sortColumn.order === "asc") {
        return <FontAwesomeIcon icon={faSortAsc} />;
      }
      return <FontAwesomeIcon icon={faSortDesc} />;
    }
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((column) => (
            <th
              className="clickable"
              key={column.path || column.key}
              onClick={() => this.raiseSort(column.path)}
            >
              {column.label} {this.renderSortIcon(column)}
              {/* <FontAwesomeIcon icon={faSortAsc} />
              <FontAwesomeIcon icon={faSortDesc} /> */}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
