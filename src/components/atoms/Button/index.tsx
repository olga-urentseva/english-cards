import React from "react";
import classNames from "classnames";

import PropTypes from "prop-types";

import classes from "./style.css";

type ButtonProps = {
  children: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  btntype: "default" | "error" | "success";
  type?: "submit";
  className?: "string";
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  btntype,
  type,
  className,
  disabled,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={!!disabled}
      className={classNames(
        classes.Button,
        classes[`Button--${btntype}`],
        className
      )}
    >
      {children}
    </button>
  );
};

// export const BUTTON_TYPES = {
//   DEFAULT: "default",
//   ERROR: "error",
//   SUCCESS: "success",
// };

// Button.propTypes = {
//   onClick: PropTypes.func,
//   btntype: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
// };

export default Button;
