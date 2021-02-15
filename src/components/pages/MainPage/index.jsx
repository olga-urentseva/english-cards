import React from "react";
import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Container from "../../atoms/Container";
import Layout from "../../templates/Layout";

import classes from "./style.css";

const MainPage = () => {
  return (
    <Layout>
      <Container>
        <div className={classes.MainWrapper}>
          <div className={classes.Hero}>
            <h2 className={classes.MainText}>
              Привет! Давай учить английский!
            </h2>
            <Button type={BUTTON_TYPES.SUCCESS}>Начать!</Button>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default MainPage;
