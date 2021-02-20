import React from "react";
import classes from "./style.css";
import classNames from "classnames";

const WordCard = ({ word, className }) => {
  return (
    <div className={classNames(className, classes.WordCard)}>
      <h1 className={classes.WordCardText}>Apple</h1>
    </div>
  );
};

export default WordCard;
