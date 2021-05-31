import React from "react";
import PropTypes from "prop-types";

import classes from "./style.css";
import classNames from "classnames";

const DictionaryItem = ({ originalWord, translations, accentSymbols }) => {
  return (
    <div className={classes.DictionaryItem}>
      <h3 className={classNames(classes.DictionaryItemOriginalWord)}>
        {originalWord
          .split(accentSymbols)
          .flatMap((part, i) =>
            i === 0
              ? part
              : [
                  <span className={classes.AccentWord} key={i}>
                    {accentSymbols}
                  </span>,
                  part,
                ]
          )
          .map((part, i) => (
            <React.Fragment key={i}>{part}</React.Fragment>
          ))}
      </h3>
      <div className={classes.DictionaryItemTranslationsWrapper}>
        {translations.map((wordTranslation) => {
          return (
            <h3
              className={classNames(classes.DictionaryItemTranslationWord)}
              key={wordTranslation}
            >
              {wordTranslation
                .split(accentSymbols)
                .flatMap((part, i) =>
                  i === 0
                    ? part
                    : [
                        <span className={classes.AccentWord} key={i}>
                          {accentSymbols}
                        </span>,
                        part,
                      ]
                )
                .map((part, i) => (
                  <React.Fragment key={i}>{part}</React.Fragment>
                ))}
            </h3>
          );
        })}
      </div>
    </div>
  );
};

DictionaryItem.propTypes = {
  originalWord: PropTypes.string,
  translations: PropTypes.array,
  accentSymbols: PropTypes.string,
};

export default DictionaryItem;
