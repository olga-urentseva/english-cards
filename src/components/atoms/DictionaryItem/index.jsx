import React from "react";
import PropTypes from "prop-types";

import classes from "./style.css";

const DictionaryItem = ({ originalWord, translations, id }) => {
  return (
    <div className={classes.DictionaryItem} key={id} id={id}>
      <h3 className={classes.DictionaryItemOriginalWord}>{originalWord}</h3>
      <div className={classes.DictionaryItemtTranslationsWrapper}>
        {translations.map((wordTranslation) => {
          return (
            <h3 className={classes.DictionaryItemTranslationWord}>
              {wordTranslation}
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
  key: PropTypes.string,
};

export default DictionaryItem;
