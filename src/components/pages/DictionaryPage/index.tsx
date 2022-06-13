import React, { useMemo, useState, useRef } from "react";
import { Navigate } from "react-router-dom";

import Container from "../../atoms/Container";
import CentralContainer from "../../atoms/CentralContainer";
import Layout from "../../templates/Layout";
import SwitchButton from "../../atoms/SwitchButton";
import Input from "../../atoms/Input";
import DictionaryItem from "../../atoms/DictionaryItem";
import { useAuthContext } from "../../contexts/AuthContext";

import classes from "./style.css";
import Dictionary from "../../../core/dictionary";
import GameState from "../../../core/GameState";
import Word from "../../../core/word";

const DictionaryPage = () => {
  const dictionaryRef = useRef<Dictionary>(null);

  if (!dictionaryRef.current) {
    dictionaryRef.current = new Dictionary();
  }

  const dictionary = dictionaryRef.current;

  const authContextValue = useAuthContext();

  const [inputValue, setInputValue] = useState("");
  const [isAllWordsDictionary, setIsAllWordsDictionary] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  // console.log(window.localStorage.getItem("gameState"));

  const searchWord = (inputValue: string, isAllWords: boolean) => {
    const searchebleWords = isAllWords
      ? dictionary.getAllWords()
      : dictionary.getUnknownWords(
          GameState.fromString(
            window.localStorage.getItem("gameState"),
            dictionary
          )
        );
    return searchebleWords.filter(
      (word: Word) =>
        word.originalWord.includes(inputValue.toLocaleLowerCase()) ||
        word.translations.some((translation) =>
          translation.includes(inputValue.toLocaleLowerCase())
        )
    );
  };

  const currentWords = useMemo(() => {
    if (inputValue === "") {
      if (isAllWordsDictionary) {
        return dictionary.getAllWords();
      }
      return dictionary.getUnknownWords(
        GameState.fromString(
          window.localStorage.getItem("gameState"),
          dictionary
        )
      );
    }
    return searchWord(inputValue, isAllWordsDictionary);
  }, [inputValue, isAllWordsDictionary]);

  const dictionaryItems = currentWords.map((word, index) => {
    return (
      <DictionaryItem
        originalWord={word.originalWord}
        translations={word.translations}
        key={index}
        accentSymbols={inputValue ? inputValue.toLocaleLowerCase() : null}
      />
    );
  });

  const switchDictionary = () => {
    setIsAllWordsDictionary(!isAllWordsDictionary);
  };

  if (!authContextValue.isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Layout>
      <Container>
        <CentralContainer>
          <div className={classes.DictionaryPage}>
            <div className={classes.ButtonsWrapper}>
              <SwitchButton
                onClick={switchDictionary}
                isActive={isAllWordsDictionary}
              >
                Все слова
              </SwitchButton>
              <SwitchButton
                onClick={switchDictionary}
                isActive={!isAllWordsDictionary}
              >
                Незнакомые
              </SwitchButton>
            </div>

            <form className={classes.SearchForm}>
              <Input
                id="dictionary-search"
                placeholder="Поиск слова"
                className={classes.DictionaryInputSearchInput}
                type="text"
                maxLength={17}
                value={inputValue}
                onChange={handleInputChange}
              />
            </form>
            <div className={classes.DictionaryItemsWrapper}>
              {currentWords.length > 0 ? (
                dictionaryItems
              ) : (
                <h3 className={classes.WordNotFounded}>
                  Искомое слово не найдено
                </h3>
              )}
            </div>
          </div>
        </CentralContainer>
      </Container>
    </Layout>
  );
};

export default DictionaryPage;
