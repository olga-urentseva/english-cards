import React, { useMemo, useState } from "react";
import { Redirect } from "react-router";

import Container from "../../atoms/Container";
import CentralContainer from "../../atoms/CentralContainer";
import Layout from "../../templates/Layout";
import SwitchButton from "../../atoms/SwitchButton";
import Input, { INPUT_TYPES } from "../../atoms/Input";
import DictionaryItem from "../../atoms/DictionaryItem";
import { useAuthContext } from "../../contexts/AuthContext";

import words from "../../../words/words";

import classes from "./style.css";

const DictionaryPage = () => {
  const authContextValue = useAuthContext();

  const [inputValue, setInputValue] = useState("");
  const [isAllWordsDictionary, setIsAllWordsDictionary] = useState(true);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const currentWords = useMemo(() => {
    if (inputValue === "") {
      return words;
    }
    return words.filter(
      (word) =>
        word[0].includes(inputValue.toLocaleLowerCase()) ||
        word[1].some((translation) =>
          translation.includes(inputValue.toLocaleLowerCase())
        )
    );
  }, [inputValue]);

  const dictionaryItems = currentWords.map((word) => {
    return (
      <DictionaryItem
        originalWord={word[0]}
        translations={word[1]}
        key={word[0]}
        accentSymbols={inputValue ? inputValue.toLocaleLowerCase() : null}
      />
    );
  });

  const switchDictionary = () => {
    setIsAllWordsDictionary(!isAllWordsDictionary);
  };

  if (!authContextValue.isAuth) {
    return <Redirect to="/" />;
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
                type={INPUT_TYPES.TEXT}
                maxLength="17"
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
