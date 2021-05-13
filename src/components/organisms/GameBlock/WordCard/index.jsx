import React from "react";
import classes from "./style.css";
import classNames from "classnames";

const WordCard = ({ word, translations, isShowTranslation, className }) => {
  return (
    <div className={classNames(className, classes.WordCard)}>
      <h1 className={classes.WordCardText}>{word}</h1>
      {isShowTranslation && (
        <h2
          className={classNames(classes.Translation, {
            [classes.TranslationShown]: isShowTranslation,
          })}
        >
          {translations.join(", ")}
        </h2>
      )}
      <div
        className={classNames(classes.Countdown, {
          [classes.CountdownActive]: isShowTranslation,
        })}
      ></div>
    </div>
  );
};

export default WordCard;
