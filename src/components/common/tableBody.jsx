import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  renderCell = (dRow, dColumn) => {
    if (dColumn.content) return dColumn.content(dRow);

    return _.get(dRow, dColumn.path);
  };

  createKey = (dRow, dColumn) => {
    return dRow._id + (dColumn.path || dColumn.key);
  };

  render() {
    const { dataSet, columns } = this.props;

    return (
      <tbody>
        {dataSet.map((dataRow) => (
          <tr key={dataRow._id}>
            {columns.map((column) => (
              <td key={this.createKey(dataRow, column)}>
                {this.renderCell(dataRow, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
