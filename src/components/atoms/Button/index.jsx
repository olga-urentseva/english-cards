import React from "react";
import classNames from "classnames";

import PropTypes from "prop-types";

import classes from "./style.css";

const Button = ({ children, onClick, type }) => {
  return (
    <button className={classNames(classes.Button, classes[`Button--${type}`])}>
      {children}
    </button>
  );
};

export const BUTTON_TYPES = {
  DEFAULT: "default",
  ERROR: "error",
  SUCCESS: "success",
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
};

export default Button;
