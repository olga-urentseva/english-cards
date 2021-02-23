import React, { useEffect, useState } from "react";
import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Input from "../../atoms/Input";
import MainContainer from "../../atoms/MainContainer";
import WordCard from "../../atoms/WordCard";
import ModalAnswer from "../../molecules/ModalAnswer";

import WordSelector from "../../../core/wordSelector.js";
import wordsObj from "../../../words/words.js";

import classes from "./style.css";

const GameBlock = () => {
  const [inputValue, setInputValue] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);

  const wordsSelector = new WordSelector(wordsObj);
  const [currentWord, setCurrentWord] = useState(() => {
    return wordsSelector.getWord();
  });

  function submitAnswer(e) {
    e.preventDefault();
    if (inputValue === currentWord.translationWord) {
      setIsCorrectAnswer(true);
    } else {
      setIsCorrectAnswer(false);
    }
    setIsModalShown(true);
  }
  function handleChange(e) {
    setInputValue(e.target.value);
  }
  return (
    <>
      {isModalShown && (
        <ModalAnswer
          isCorrect={isCorrectAnswer}
          close={() => {
            setIsModalShown(false);
          }}
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
