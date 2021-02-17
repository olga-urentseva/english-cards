import React from "react";
import classes from "./style.css";
import classNames from "classnames";

const LogOutButton = ({ onclick, className }) => {
  return (
    <button className={classNames(classes.LogOutButton, className)}></button>
  );
};

export default LogOutButton;
