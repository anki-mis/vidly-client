import React from "react";
import PropTypes from "prop-types";
import _ from "lodash"; // the underscore variable name is just a convention, it can be named differently.
// lodash is an optimized version of popular js lib underscore, hence the convention

const Pagination = (props) => {
  // need to know below:-
  //[1, 2, 3].map(<li>...</li>)
  // 1st how do we create this array:-
  // props has a couple properties, 1st use them to get the page count
  // (no. of pages for the data to be distributed into)
  // then, from these numbers create an array like this [1,...,pagesCount] - one way to do this is to use lodash,
  // a JS util library.

  const { itemsCount, pageSize, onPageChange, currentPage } = props;
  // console.log(
  //   "itemsCount-" + itemsCount,
  //   ". pageSize-" + pageSize,
  //   ". Init currentPage-" + currentPage
  // );

  //console.log("currentPage(inside pagination component) " + currentPage);

  if (pageSize < 1) {
    pageSize = 1;
  }
  const pagesCount = Math.ceil(itemsCount / pageSize);
  //console.log("pagesCount ", pagesCount);
  if (pagesCount <= 1) {
    return null;
  }
  const pages = _.range(1, pagesCount + 1); //creating an array like this [1,...,pagesCount]
  //console.log(pages);

  return (
    <nav>
      <ul className="pagination">
        {/* now mapping the pages array created above to li elements */}
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
            style={{ cursor: "pointer" }}
          >
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

//Adding a new property to Pagination component for type checking of props.
//Below makes sure a consumer of this component while passng these props adhere to the types/validations
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
