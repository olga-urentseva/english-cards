import React, { useState, useRef } from "react";

import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import Score from "../../atoms/Score";
import WordCard from "./WordCard";
import CentralContainer from "../../atoms/CentralContainer";

import { useAppManager } from "../../contexts/AppManagerContext";

import classes from "./style.css";

const GameBlock = () => {
  const [inputValue, setInputValue] = useState("");

  const appManager = useAppManager();

  const gameRef = useRef(null);
  if (!gameRef.current) {
    gameRef.current = appManager.loadGame();
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

  function submitAnswer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isCorrect = game.answer(currentWord, inputValue);
    appManager.saveGame(game);
    if (isCorrect) {
      setCurrentWord(game.getRandomWord());
      setInputValue("");
    } else {
      incorrectAnswerHandle();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(e.target.value);
  }

  function handleSkip() {
    game.skip(currentWord);
    incorrectAnswerHandle();
    appManager.saveGame(game);
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
            maxLength={15}
            disabled={isShowTranslation || !currentWord}
          />
          <Button
            type="submit"
            btntype="success"
            className={classes.GameBtn}
            disabled={isShowTranslation || !currentWord}
          >
            Проверить
          </Button>
        </form>
        <Button
          btntype="error"
          className={classes.GameBtn}
          onClick={handleSkip}
          disabled={isShowTranslation || !currentWord}
        >
          {"Не знаю :("}
        </Button>
      </div>
    </CentralContainer>
  );
};

export default GameBlock;
