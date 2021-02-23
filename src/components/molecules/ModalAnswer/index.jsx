import React from "react";
import Modal from "../../atoms/Modal";

import PropTypes from "prop-types";

import classes from "./style.css";

const ModalAnswer = ({ isCorrect, close, word }) => {
  console.log(isCorrect);
  return (
    <Modal close={close}>
      {isCorrect ? (
        <span className={classes.ModalAnswertext}>Верно!</span>
      ) : (
        <span className={classes.ModalAnswertext}>
          К сожалению, не совсем верно :( Слово <strong>{word}</strong> было
          добавлено в список слов для повторения.
        </span>
      )}
    </Modal>
  );
};

ModalAnswer.propTypes = {
  isCorrect: PropTypes.bool,
};

export default ModalAnswer;
