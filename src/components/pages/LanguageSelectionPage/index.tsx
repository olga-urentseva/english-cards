import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Layout from "../../templates/Layout";
import Container from "../../atoms/Container";
import Button from "../../atoms/Button";
import Modal from "../../atoms/Modal";
import Input from "../../atoms/Input";
import CentralContainer from "../../atoms/CentralContainer";

import { useAuthContext } from "../../contexts/AuthContext";
import { useAppManager } from "../../contexts/AppManagerContext";

import UserDictionaryParser from "../../../core/UserDictionaryParser";

import classes from "./style.css";

const LanguageSelectionPage = () => {
  const authContextValue = useAuthContext();
  const appManager = useAppManager();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isFileValid, setIsFileValid] = React.useState<boolean>(null);

  const navigate = useNavigate();

  function handlePersonalWordsClick() {
    setIsModalOpen(true);
  }

  async function handleUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const parser = new UserDictionaryParser(e.target.files[0]);
      const dictionary = await parser.getDictionary();
      appManager.setDictionary(dictionary);
      dictionary.saveToBD();
      setIsFileValid(true);
    } catch (err) {
      console.log(err);
      setIsFileValid(false);
    }
  }

  function startGameWithPersonalWords() {
    navigate("/game");
  }

  function startGameWithDefaultWords() {
    appManager.setDictionary();
    navigate("/game");
  }

  if (!authContextValue.isAuth) {
    return <Navigate to="/" />;
  }
  return (
    <Layout>
      <Container>
        <CentralContainer>
          <Modal
            isShown={isModalOpen}
            close={() => {
              setIsModalOpen(false);
            }}
          >
            {isFileValid === false && (
              <p className={classes.ErrorMessage}>
                Файл не соотстветсвует ожиданиям
              </p>
            )}
            <form onSubmit={startGameWithPersonalWords}>
              <div className={classes.FormElementsWrapper}>
                <Input
                  type="file"
                  accept="application/JSON"
                  id="file"
                  labelText="Мы распознаём только JSON в формате [['word', ['слово', 'словечко' ]]]"
                  onChange={handleUploadFile}
                  className={classes.FormInput}
                />

                <Button type="submit" btntype="success" disabled={!isFileValid}>
                  Изучать слова
                </Button>
              </div>
            </form>
          </Modal>
          <div>
            <h2>Какие слова ты хочешь учить?</h2>
            <h4>
              Ты можешь загрузить свои слова или же учить английский со словами
              из нашего словаря.
            </h4>
            <div className={classes.ButtonsWrapper}>
              <Button btntype="success" onClick={handlePersonalWordsClick}>
                Cвои слова
              </Button>
              <Button btntype="success" onClick={startGameWithDefaultWords}>
                Английские
              </Button>
            </div>
          </div>
        </CentralContainer>
      </Container>
    </Layout>
  );
};

export default LanguageSelectionPage;
