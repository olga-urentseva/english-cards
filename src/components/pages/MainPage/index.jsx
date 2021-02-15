import React from "react";
import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Container from "../../atoms/Container";
import Input, { INPUT_TYPES } from "../../atoms/Input";
import Layout from "../../templates/Layout";

import classes from "./style.css";

const MainPage = () => {
  function submitForm() {}

  return (
    <Layout>
      <Container>
        <div className={classes.MainWrapper}>
          <div className={classes.Hero}>
            <h2 className={classes.MainText}>
              Привет! Давай учить английский!
            </h2>
            <form onSubmit={submitForm}>
              <Input type={INPUT_TYPES.TEXT} placeholder="Имя" />
              <Button type="submit" btntype={BUTTON_TYPES.SUCCESS}>
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
