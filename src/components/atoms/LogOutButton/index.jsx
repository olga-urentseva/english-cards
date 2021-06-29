import React from "react";
import classes from "./style.css";
import classNames from "classnames";

const LogOutButton = ({ onClick, className }) => {
  return (
    <button
      className={classNames(classes.LogOutButton, className)}
      onClick={onClick}
      name="logout"
    ></button>
  );
};

export default LogOutButton;
