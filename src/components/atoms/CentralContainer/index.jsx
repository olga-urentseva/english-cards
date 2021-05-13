import React from "react";

import classes from "./style.css";

const CentralContainer = ({ children }) => {
  return <div className={classes.MainContainer}>{children}</div>;
};

export default CentralContainer;
