import React from "react";

import classes from "./style.css";

const Container = ({ children }) => {
  return <div className={classes.Container}>{children}</div>;
};

export default Container;
