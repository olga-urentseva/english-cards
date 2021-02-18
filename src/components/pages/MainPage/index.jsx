import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Container from "../../atoms/Container";
import Input, { INPUT_TYPES } from "../../atoms/Input";
import { useAuthContext } from "../../contexts/AuthContext";
import Layout from "../../templates/Layout";

import classes from "./style.css";

const MainPage = () => {
  const authContextValue = useAuthContext();
  const [inputValue, setInputValue] = useState(null);

  const history = useHistory();

  function submitForm(e) {
    e.preventDefault();
    authContextValue.login(inputValue);
    history.push("/game");
  }

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function closeContinueModal() {
    history.push("/game");
  }

  return (
    <Layout>
      <Container>
        <div className={classes.MainWrapper}>
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
        </div>
      </Container>
    </Layout>
  );
};

export default MainPage;