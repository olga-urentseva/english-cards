import React, { useMemo, useState } from "react";
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

  // const searchWord = (e) => {
  //   e.preventDefault();
  //   console.log(inputValue);

  //   const searchedWord = words.find((word) => {
  //     return (
  //       word[0] === inputValue ||
  //       word[1].find((translation) => translation === inputValue)
  //     );
  //   });
  //   console.log(searchedWord);

  //   if (searchedWord) {
  //     setIsWordFinded(true);
  //     setSearchedWord(searchedWord);
  //   } else {
  //     setSearchedWord("");
  //     setIsWordFinded(false);
  //   }
  // };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const currentWords = useMemo(() => {
    if (inputValue === "") {
      return words;
    }
    return words.filter(
      (word) =>
        word[0].includes(inputValue) ||
        word[1].some((translation) => translation.includes(inputValue))
    );
  }, [inputValue]);

  const dictionaryItems = currentWords.map((word) => {
    return (
      <DictionaryItem
        originalWord={word[0]}
        translations={word[1]}
        key={word[0]}
      />
    );
  });

  // create every render, it's not well

  return (
    <Layout>
      <Container>
        <CentralContainer>
          <div className={classes.DictionaryPage}>
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
              {/* <SearchButton
                type="submit"
                className={classes.DictionaryInputSearchButton}
              /> */}
            </form>
            <div className={classes.DictionaryItemsWrapper}>
              {currentWords.length > 0 ? (
                dictionaryItems
              ) : (
                <h3 className={classes.WordNotFounded}>
                  Искомое слово не найдено, но у нас есть другие:
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
