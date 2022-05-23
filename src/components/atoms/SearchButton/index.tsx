import classNames from "classnames";
import React from "react";
import SearchIcon from "./SearchIcon";

import classes from "./style.css";

const SearchButton = ({ type, className }: JSX.IntrinsicElements["button"]) => {
  return (
    <button
      type={type}
      className={classNames(classes.SearchButton, className)}
      title="Search word"
    >
      <SearchIcon />
    </button>
  );
};

export default SearchButton;
