import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import classes from "./style.css";

type Props = JSX.IntrinsicElements["input"] & {
  labelText?: string;
};

const Input = ({ className, id, labelText, ...rest }: Props) => {
  return (
    <>
      <label htmlFor={id}>{labelText}</label>
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
