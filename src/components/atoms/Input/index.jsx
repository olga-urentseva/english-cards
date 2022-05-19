import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./style.css";

const Input = ({ className, id, ...rest }) => {
  return (
    <>
      <label htmlFor={id} />
      <input
        id={id}
        className={classNames(classes.Input, className)}
        {...rest}
      />
    </>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Input;
