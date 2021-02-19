import React from "react";

import classes from "./style.css";

const MainContainer = ({ children }) => {
  return <div className={classes.MainContainer}>{children}</div>;
};

export default MainContainer;
