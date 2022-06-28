import React from "react";
import classNames from "classnames";

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

export default Button;
