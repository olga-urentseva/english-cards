import * as React from "react";

import Layout from "../../templates/Layout";
import Container from "../../atoms/Container";
import Button from "../../atoms/Button";
import CentralContainer from "../../atoms/CentralContainer";

import { useAuthContext } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";

import classes from "./style.css";
import Modal from "../../atoms/Modal";
import Input from "../../atoms/Input";

const LanguageSelectionPage = () => {
  const authContextValue = useAuthContext();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<string | File>("");

  const navigate = useNavigate();

  const handleOurDictionaryButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    navigate("/game");
  };

  const handlePersonalWordsButton = () => {
    setIsModalOpen(true);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
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
            <form
              onSubmit={() => {
                console.log("lala");
              }}
            >
              <div className={classes.FormElementsWrapper}>
                <Input
                  type="file"
                  accept="application/JSON"
                  id="file"
                  labelText="Мы распознаём только JSON в формате [['word', ['слово', 'словечко' ]]]"
                  onChange={handleUploadFile}
                />
                <Button
                  type="submit"
                  btntype="success"
                  disabled={!selectedFile}
                >
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
