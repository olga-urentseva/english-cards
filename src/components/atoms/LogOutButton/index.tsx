import React, { MouseEventHandler } from "react";
import classes from "./style.css";
import classNames from "classnames";

type LogOutButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  className: string;
};

const LogOutButton = ({ onClick, className }: LogOutButtonProps) => {
  return (
    <button
      className={classNames(classes.LogOutButton, className)}
      onClick={onClick}
      name="logout"
    ></button>
  );
};

export default LogOutButton;
