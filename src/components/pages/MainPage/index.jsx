import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Container from "../../atoms/Container";
import Input, { INPUT_TYPES } from "../../atoms/Input";
import MainContainer from "../../atoms/MainContainer";
import { useAuthContext } from "../../contexts/AuthContext";
import Layout from "../../templates/Layout";
import ContinuePage from "../ContinuePage";

import classes from "./style.css";

const MainPage = () => {
  const authContextValue = useAuthContext();
  const [inputValue, setInputValue] = useState("");

  const history = useHistory();

  function submitForm(e) {
    e.preventDefault();
    authContextValue.login(inputValue);
    history.push("/game");
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  if (authContextValue.isAuth) {
    return <ContinuePage />;
  } else {
    return (
      <Layout>
        <Container>
          <MainContainer>
            <div className={classes.Hero}>
              <h2 className={classes.MainText}>
                Привет! Давай учить английский!
              </h2>
              <form onSubmit={submitForm} className={classes.FormWrapper}>
                <Input
                  type={INPUT_TYPES.TEXT}
                  placeholder="Имя"
                  className={classes.FormInput}
                  onChange={handleChange}
                  value={inputValue}
                />
                <Button
                  type="submit"
                  btntype={BUTTON_TYPES.SUCCESS}
                  className={classes.FormButton}
                >
                  Начать!
                </Button>
              </form>
            </div>
          </MainContainer>
        </Container>
      </Layout>
    );
  }
};

export default MainPage;
