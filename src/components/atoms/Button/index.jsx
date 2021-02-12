import React from "react";

import PropTypes from "prop-types";
import { classes } from "istanbul-lib-coverage";

import classes from "./style.css";

const Button = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={classes[`Button--${type}`]}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  type: PropTypes.string,
};

export default Button;
