import React, { Component } from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import Like from "./common/like";
import Table from "./common/table";

class MoviesTable extends Component {
  // Defining and initializing columns props to be passed to tableHeader component
  // this doesnt have to be defined inside state variable as its values are not
  // going to change throughout lifecycle of this component.
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (movie) => (
        <Like
          liked={movie.liked}
          likeToggleClicked={() => this.props.onLikeToggle(movie)}
        />
      ),
    },
  ];

  deleteColumn = {
    key: "delete",
    content: (movie) => (
      <button
        onClick={() => this.props.onDelete(movie)} //the func has to be written this way because direct func call cannot be done, only reference
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }

  render() {
    //onSort is ref to a function here or ref to event handler in movies component
    const { pageMovies, sortColumn, onSort } = this.props;

    //console.log("Inside moviesTable - ", this.props);

    // columns: array
    // sortColumn: object
    // onSort: function
    // pageMovies: an array of objects
    return (
      <Table
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
        outDataset={pageMovies}
      />
    );

    /*columns, sortColumn, onSort, outDataset */
  }
}

export default MoviesTable;
