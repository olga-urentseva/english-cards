import React from "react";
import classNames from "classnames";

import classes from "./style.css";

const Backdrop = ({ close, isShown }) => {
  return (
    <div
      className={classNames(classes.Backdrop, {
        [classes.BackdropShown]: isShown,
      })}
      onClick={close}
    ></div>
  );
};

export default Backdrop;
