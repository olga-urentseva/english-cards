import React, { useState, useRef } from "react";

import GameSaveManager from "../../../core/gameSaveManager";

import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Input from "../../atoms/Input";
import Score from "../../atoms/Score";
import WordCard from "../../atoms/WordCard";
import MainContainer from "../../atoms/MainContainer";

import classes from "./style.css";

const GameBlock = () => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const gameRef = useRef(null);

  if (!gameRef.current) {
    gameRef.current = GameSaveManager.load();
  }
  const game = gameRef.current;

  const [currentWord, setCurrentWord] = useState(() => game.getRandomWord());

  function submitAnswer(e) {
    e.preventDefault();

    const isCorrect = game.answer(currentWord, inputValue);
    setIsCorrectAnswer(isCorrect);
    GameSaveManager.save(game);

    setCurrentWord(game.getRandomWord());
    setInputValue("");
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  return (
    <MainContainer>
      <div className={classes.GameWrapper}>
        <Score score={game.getScore()} />
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
        <Button
          btntype={BUTTON_TYPES.ERROR}
          className={classes.GameBtn}
          onClick={() => {
            setCurrentWord(game.getRandomWord());
          }}
        >
          Не знаю :(
        </Button>
      </div>
    </MainContainer>
  );
};

export default GameBlock;
