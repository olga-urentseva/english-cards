import React from "react";
import classNames from "classnames";

import classes from "./style.css";

const Backdrop = ({ close, className }) => {
  return (
    <div
      className={classNames(classes.Backdrop, className)}
      onClick={close}
    ></div>
  );
};

export default Backdrop;
