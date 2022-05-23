import React from "react";

import classes from "./style.css";

import DictionaryIcon from "./DictionaryIcon";
import { Link } from "react-router-dom";

const DictionaryLinkButton = ({ className }: { className: string }) => {
  return (
    <Link to="/dictionary" className={`${classes.DictionaryLink} ${className}`}>
      <DictionaryIcon />
    </Link>
  );
};

export default DictionaryLinkButton;
