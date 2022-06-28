import React from "react";

import classes from "./style.css";

const ButtonLink = ({ ...otherProps }) => {
  return <a {...otherProps} className={classes.ButtonLink} />;
};

export default ButtonLink;
