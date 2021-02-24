import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Input from "../../atoms/Input";
import MainContainer from "../../atoms/MainContainer";
import WordCard from "../../atoms/WordCard";
import ModalAnswer from "../../molecules/ModalAnswer";

import Game from "../../../core/game.js";

import classes from "./style.css";

const GameBlock = () => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const gameRef = useRef();

  if (!gameRef.current) {
    gameRef.current = new Game();
  }

  const [currentWord, setCurrentWord] = useState(() => {
    return gameRef.current.getRandomWord();
  });

  function submitAnswer(e) {
    e.preventDefault();

    if (gameRef.current.checkTranslation(currentWord, inputValue)) {
      setIsCorrectAnswer(true);
    } else {
      setIsCorrectAnswer(false);
    }
    setIsModalShown(true);
  }
  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function closeModal() {
    setIsModalShown(false);
    setCurrentWord(gameRef.current.getRandomWord());
    setInputValue("");
  }

  return (
    <>
      {isModalShown && (
        <ModalAnswer
          isCorrect={isCorrectAnswer}
          close={closeModal}
          word={currentWord.originalWord}
        />
      )}
      <MainContainer>
        <div className={classes.GameWrapper}>
          <WordCard
            className={classes.GameCard}
            word={currentWord.originalWord}
          />
          <form className={classes.GameForm} onSubmit={submitAnswer}>
            <Input
              placeholder="Перевод"
              className={classes.GameInput}
              onChange={handleChange}
              value={inputValue}
              required
              maxLength="15"
            />
            <Button
              type="submit"
              btntype={BUTTON_TYPES.SUCCESS}
              className={classes.GameBtn}
            >
              Проверить
            </Button>
          </form>
          <Button btntype={BUTTON_TYPES.ERROR} className={classes.GameBtn}>
            Не знаю :(
          </Button>
        </div>
      </MainContainer>
    </>
  );
};

export default GameBlock;
