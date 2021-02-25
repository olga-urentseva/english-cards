import React, { useEffect, useState, useRef } from "react";
import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Input from "../../atoms/Input";
import MainContainer from "../../atoms/MainContainer";
import WordCard from "../../atoms/WordCard";

import Game from "../../../core/game.js";

import classes from "./style.css";
import Score from "../../atoms/Score";

const GameBlock = () => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const gameRef = useRef();

  if (!gameRef.current) {
    gameRef.current = new Game();
  }

  const [currentWord, setCurrentWord] = useState(() => {
    return gameRef.current.getRandomWord();
  });

  function submitAnswer(e) {
    e.preventDefault();

    setIsCorrectAnswer(gameRef.current.answer(currentWord, inputValue));
    setCurrentWord(gameRef.current.getRandomWord());
    setInputValue("");
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <MainContainer>
      <div className={classes.GameWrapper}>
        <Score score={gameRef.current.getScore()} />
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
  );
};

export default GameBlock;
