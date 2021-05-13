import React from "react";

import classes from "./style.css";

import DictionaryIcon from "./DictionaryIcon";
import { Link } from "react-router-dom";

const DictionaryLinkButton = () => {
  return (
    <Link to="/dictionary" className={classes.DictionaryLink}>
      <DictionaryIcon />
    </Link>
  );
};

export default DictionaryLinkButton;
