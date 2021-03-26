import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./style.css";

const Input = ({ className, disabled, ...rest }) => {
  return (
    <input
      disabled={disabled ? true : false}
      className={classNames(classes.Input, className)}
      {...rest}
    />
  );
};

export const INPUT_TYPES = {
  TEXT: "text",
};

Input.propTypes = {
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)),
  onChange: PropTypes.func,
};

export default Input;
