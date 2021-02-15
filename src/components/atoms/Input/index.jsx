import React from "react";
import PropTypes from "prop-types";

import classes from "./style.css";

const Input = ({ children, type, onChange, placeholder }) => {
  return (
    <input
      type={type}
      onChange={onChange}
      className={classes.Input}
      placeholder={placeholder}
      required
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
