import React, { useState } from "react";
import Container from "../../atoms/Container";
import CentralContainer from "../../atoms/CentralContainer";
import Layout from "../../templates/Layout";
import Input, { INPUT_TYPES } from "../../atoms/Input";
import SearchButton from "../../atoms/SearchButton";
import DictionaryItem from "../../atoms/DictionaryItem";

import words from "../../../words/words";

import classes from "./style.css";

const DictionaryPage = () => {
  const [inputValue, setInputValue] = useState("");

  const searchWord = (e) => {
    e.preventDefault();
    console.log(inputValue);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const dictionaryItems = words.map((word) => {
    return (
      <DictionaryItem
        originalWord={word[0]}
        translations={word[1]}
        id={word[0]}
      />
    );
  });

  return (
    <Layout>
      <Container>
        <CentralContainer>
          <div className={classes.DictionaryPage}>
            <form onSubmit={searchWord} className={classes.SearchForm}>
              <Input
                id="dictionary-search"
                placeholder="Поиск слова"
                className={classes.DictionaryInputSearchInput}
                type={INPUT_TYPES.TEXT}
                maxLength="17"
                value={inputValue}
                onChange={handleInputChange}
              />
              <SearchButton
                type="submit"
                className={classes.DictionaryInputSearchButton}
              />
            </form>
            <div className={classes.DictionaryItemsWrapper}>
              {dictionaryItems}
            </div>
          </div>
        </CentralContainer>
      </Container>
    </Layout>
  );
};

export default DictionaryPage;
