import React, { useState, useRef } from "react";

import GameSaveManager from "../../../core/gameSaveManager";

import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Input from "../../atoms/Input";
import Score from "../../atoms/Score";
import WordCard from "./WordCard";
import CentralContainer from "../../atoms/CentralContainer";

import classes from "./style.css";

const GameBlock = () => {
  const [inputValue, setInputValue] = useState("");

  const gameSaveManagerRef = useRef(null);
  if (!gameSaveManagerRef.current) {
    gameSaveManagerRef.current = new GameSaveManager();
  }
  const gameSaveManager = gameSaveManagerRef.current;

  const gameRef = useRef(null);
  if (!gameRef.current) {
    gameRef.current = gameSaveManager.load();
  }
  const game = gameRef.current;

  const [currentWord, setCurrentWord] = useState(() => game.getRandomWord());

  const [isShowTranslation, setIsShownTranslation] = useState(false);

  function incorrectAnswerHandle() {
    setIsShownTranslation(true);

    setTimeout(() => {
      setIsShownTranslation(false);
      setCurrentWord(game.getRandomWord());
      setInputValue("");
    }, 4000);
  }

  function submitAnswer(e) {
    e.preventDefault();
    const isCorrect = game.answer(currentWord, inputValue);
    gameSaveManager.save(game);
    if (isCorrect) {
      setCurrentWord(game.getRandomWord());
      setInputValue("");
    } else {
      incorrectAnswerHandle();
    }
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSkip() {
    game.skip(currentWord);
    incorrectAnswerHandle();
    gameSaveManager.save(game);
  }

  return (
    <CentralContainer>
      <div className={classes.GameWrapper}>
        <Score score={game.getScore()} />
        <WordCard
          isShowTranslation={isShowTranslation}
          translations={currentWord ? currentWord.translations : []}
          className={classes.GameCard}
          word={
            currentWord
              ? currentWord.originalWord
              : "Кажется, у нас закончились слова"
          }
        />

        <form className={classes.GameForm} onSubmit={submitAnswer}>
          <Input
            id="answer"
            placeholder="Перевод"
            className={classes.GameInput}
            onChange={handleChange}
            value={inputValue}
            required
            maxLength="15"
            disabled={isShowTranslation || !currentWord}
          />
          <Button
            type="submit"
            btntype={BUTTON_TYPES.SUCCESS}
            className={classes.GameBtn}
            disabled={isShowTranslation || !currentWord}
          >
            Проверить
          </Button>
        </form>
        <Button
          btntype={BUTTON_TYPES.ERROR}
          className={classes.GameBtn}
          onClick={handleSkip}
          disabled={isShowTranslation || !currentWord}
        >
          Не знаю :(
        </Button>
      </div>
    </CentralContainer>
  );
};

export default GameBlock;
