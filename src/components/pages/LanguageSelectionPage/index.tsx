import * as React from "react";
import { Navigate, useNavigate } from "react-router-dom";

import Layout from "../../templates/Layout";
import Container from "../../atoms/Container";
import Button from "../../atoms/Button";
import Modal from "../../atoms/Modal";
import Input from "../../atoms/Input";
import CentralContainer from "../../atoms/CentralContainer";

import { useAuthContext } from "../../contexts/AuthContext";

import UserDictionaryParser from "../../../core/UserDictionaryParser";

import classes from "./style.css";

const LanguageSelectionPage = () => {
  const authContextValue = useAuthContext();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isFileValid, setIsFileValid] = React.useState<boolean>(null);

  const navigate = useNavigate();

  const handleOurDictionaryButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate("/game");
  };

  const handlePersonalWordsButton = () => {
    setIsModalOpen(true);
  };

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      console.log(e.target.files[0]);
      const parser = new UserDictionaryParser(e.target.files[0]);
      const dictionary = await parser.getDictionary();
      dictionary.saveToBD();
      setIsFileValid(true);
    } catch (err) {
      console.log(err);

      setIsFileValid(false);
    }
  };

  const startGameWithPersonalWords = () => {
    navigate("/game");
  };

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
                />
                {isFileValid === true ? (
                  <Button
                    type="submit"
                    btntype="success"
                    disabled={!isFileValid}
                  >
                    Изучать слова
                  </Button>
                ) : null}
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
              <Button btntype="default" onClick={handlePersonalWordsButton}>
                Cвои слова
              </Button>
              <Button btntype="default" onClick={handleOurDictionaryButton}>
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
