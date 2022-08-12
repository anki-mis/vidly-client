import React, { Component } from "react";
import { toast } from "react-toastify";
//import { getMovies, deleteMovie } from "../services/fakeMovieService";
import { getMovies, deleteMovie } from "../services/movieService";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import MoviesTable from "./moviesTable";
//import { getGenres } from "../services/fakeGenreService";
import { getGenres } from "../services/genreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { pathToTargetProp: "title", order: "asc" },
  };

  // Mount phase - an instance of this component is created
  // called when an instance of this component is rendered in the DOM
  async componentDidMount() {
    const result = await getGenres();

    const oneAndAllGenres = [{ _id: "", name: "All Genres" }, ...result.data];

    const l_movies = await getMovies();
    this.setState({ movies: l_movies.data, genres: oneAndAllGenres });
  }

  handleDelete = async (movie) => {
    // As part of optimistic delete, the movie is removed from UI first,
    // then deleted from repository(array/mongodb)

    //console.log(movie);
    const originalMovies = this.state.movies;
    const remainingMovies = originalMovies.filter((m) => m._id !== movie._id);
    // console.log(
    //   "currentPage value inside handleDelete = ",
    //   this.state.currentPage
    // );
    this.setState({ movies: remainingMovies });

    try {
      await deleteMovie(movie._id);
    } catch (e) {
      if (e.response && e.response.status === 404) {
        toast.error("This movie has already been deleted.");
      }
      this.setState({ movies: originalMovies });
    }
  };

  handleLike = (movie) => {
    const l_movies = [...this.state.movies];
    const index = l_movies.indexOf(movie);
    l_movies[index] = { ...l_movies[index] };
    l_movies[index].liked = !l_movies[index].liked;
    console.log(l_movies);
    this.setState({ movies: l_movies });
  };

  handlePageChange = (pageNo) => {
    //console.log("pageNo ", pageNo, ".currentPage " + this.state.currentPage);
    this.setState({ currentPage: pageNo });
  };

  handleGenreSelect = (p_genre) => {
    //console.log(p_genre);
    this.setState({ selectedGenre: p_genre, searchQuery: "", currentPage: 1 });
  }; // searchQuery is important parameter to SearchBox component which is a controlled component,
  // hence blank string instead of null, so that React doesnt misunderstand this for uncontrolled component

  handleSearch = (p_query) => {
    this.setState({
      searchQuery: p_query,
      selectedGenre: null,
      currentPage: 1,
    });
  };

  handleSort = (p_sortColumnObj) => {
    this.setState({ sortColumn: p_sortColumnObj });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      selectedGenre,
      searchQuery,
      sortColumn,
      movies,
    } = this.state;

    //before paginating, we need filtering to get the set of data to be applied pagination on
    //which will not be the entire set of movies after applying filtering for genre
    const filteredMovies = searchQuery
      ? movies.filter((m) =>
          m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        )
      : selectedGenre && selectedGenre._id
      ? movies.filter((m) => m.genre._id === selectedGenre._id)
      : movies;

    //After filtering apply sorting, then paginate
    const sortedMovies = _.orderBy(
      filteredMovies,
      [sortColumn.pathToTargetProp],
      [sortColumn.order]
    );

    //paginating dataset after filtering and sorting
    const thisPageMovies = paginate(sortedMovies, currentPage, pageSize);

    return { totalCount: filteredMovies.length, data: thisPageMovies };
  };

  render() {
    // same as const count = this.state.movies.length;
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const { pageSize, currentPage, sortColumn } = this.state;

    //console.log("currentPage value at start of render = ", currentPage);

    const { totalCount, data: thisPageMovies } = this.getPagedData();

    //extract current logged in user
    const { user } = this.props;

    //-----------------------
    //Below example explains the handleLike code
    // const l_movies = [{ prop1: "a" }, { prop1: "b" }, { prop1: "c" }];
    // const l_movie_ref = l_movies;
    // const l_movies_2 = { ...l_movies };
    // l_movies_2[1] = { ...l_movies_2[1] };

    // l_movies[1] = null;
    // console.log("l_movies = ", l_movies);
    // console.log("l_movie_ref = ", l_movie_ref);
    // console.log("l_movies_2 = ", l_movies_2);
    //-----------------------

    //return table.table>thead>tr>th*4 then <tab> will generate the markup ----> Zen coding
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            //below 2 props have default values defined in the component where they are passed onto
            //so commenting out to make the interfacing a bit lightweight
            // textProperty="name"
            // valueProperty="_id"
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          {user && (
            <Link
              to="/movies/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Movie
            </Link>
          )}

          <p>Showing {totalCount} movies in the database.</p>
          <SearchBox
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
          <MoviesTable
            pageMovies={thisPageMovies}
            sortColumn={sortColumn}
            onDelete={this.handleDelete}
            onLikeToggle={this.handleLike} //{() => this.handleLike(movie)}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            onPageChange={this.handlePageChange}
            currentPage={currentPage}
          />
        </div>
      </div>
    );
  }
}

//onClick={this.handleLike(movie)}

export default Movies;
