import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./style.css";

const Input = ({ children, type, onChange, placeholder, className }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      className={classNames(classes.Input, className)}
      placeholder={placeholder}
      required
      maxLength="15"
    >
      {children}
    </input>
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
