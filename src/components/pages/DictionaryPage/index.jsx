import React from "react";
import Container from "../../atoms/Container";
import CentralContainer from "../../atoms/CentralContainer";
import Layout from "../../templates/Layout";
import Input from "../../atoms/Input";
import SearchButton from "../../atoms/SearchButton";

import classes from "./style.css";

const LibraryPage = () => {
  const searchWord = (e) => {
    console.log(e.target.value);
  };

  return (
    <Layout>
      <Container>
        <CentralContainer>
          <form onSubmit={searchWord} className={classes.SearchForm}>
            <Input
              id="dictionary-search"
              placeholder="Поиск слова"
              className={classes.DictionaryInputSearchInput}
            />
            <SearchButton
              type="submit"
              className={classes.DictionaryInputSearchButton}
            />
          </form>
        </CentralContainer>
      </Container>
    </Layout>
  );
};

export default LibraryPage;
