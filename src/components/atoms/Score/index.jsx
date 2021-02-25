import React from "react";
import classes from "./style.css";

const Score = ({ score }) => {
  return (
    <div className={classes.ScoreWrapper}>
      <span className={classes.ScoreText}>
        Твой счёт: <pre className={classes.Score}>{score}</pre>
      </span>
    </div>
  );
};

export default Score;
