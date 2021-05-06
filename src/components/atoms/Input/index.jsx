import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./style.css";

const Input = ({ className, disabled, id, ...rest }) => {
  return (
    <>
      <label htmlFor={id} />
      <input
        id={id}
        disabled={disabled ? true : false}
        className={classNames(classes.Input, className)}
        {...rest}
      />
    </>
  );
};

export const INPUT_TYPES = {
  TEXT: "text",
};

Input.propTypes = {
  type: PropTypes.oneOf(Object.values(INPUT_TYPES)),
  onChange: PropTypes.func,
  id: PropTypes.string,
};

export default Input;
