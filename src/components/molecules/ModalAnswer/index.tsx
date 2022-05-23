import React from "react";
import Modal from "../../atoms/Modal";

import PropTypes from "prop-types";

import classes from "./style.css";

type ModalAnswerProps = {
  isCorrect: boolean;
  close: (e: React.MouseEvent) => void;
  word: string;
};

const ModalAnswer = ({ isCorrect, close, word }: ModalAnswerProps) => {
  return (
    <Modal close={close}>
      {isCorrect ? (
        <span className={classes.ModalAnswertext}>Верно!</span>
      ) : (
        <span className={classes.ModalAnswertext}>
          К сожалению, не совсем верно. Слово <strong>{word}</strong> было
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
