import React, { ReactElement } from "react";

import classes from "./style.css";

const CentralContainer = ({
  children,
}: {
  children: ReactElement | ReactElement[];
}) => {
  return <div className={classes.MainContainer}>{children}</div>;
};

export default CentralContainer;
