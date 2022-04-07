import * as React from "react";
import classNames from "classnames";

import classes from "./style.css";

const SwitchButton = ({ isActive, ...rest }) => {
  return (
    <button
      className={classNames(classes.SwitchButton, {
        [classes.SwitchButtonActive]: isActive,
      })}
      {...rest}
    ></button>
  );
};

export default SwitchButton;
