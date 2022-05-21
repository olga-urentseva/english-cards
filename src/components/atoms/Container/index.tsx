import React, { ReactElement } from "react";

import classes from "./style.css";

const Container = ({ children }: { children: ReactElement }) => {
  return <div className={classes.Container}>{children}</div>;
};

export default Container;
