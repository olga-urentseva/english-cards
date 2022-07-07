import React from "react";

import Layout from "../../templates/Layout";
import Container from "../../atoms/Container";
import Button from "../../atoms/Button";
import { useAuthContext } from "../../contexts/AuthContext";

import classes from "./style.css";
import CentralContainer from "../../atoms/CentralContainer";
import ButtonLink from "../../atoms/ButtonLink";

const ContinuePage = () => {
  const authContextValue = useAuthContext();

  return (
    <Layout>
      <Container>
        <CentralContainer>
          <div className={classes.ContinueBlockWrapper}>
            <span className={classes.ContinueBlockText}>
              Хочешь продолжить учить английский под именем
              <b>{` ${authContextValue.userName}`}</b>? Или ты можешь начать
              заново!
            </span>
            <div className={classes.ButtonsWrapper}>
              <ButtonLink className={classes.ContinuePageButton} href="/game">
                Продолжить
              </ButtonLink>
              <Button
                className={classes.ContinuePageButton}
                btntype="default"
                onClick={() => {
                  authContextValue.logOut();
                }}
              >
                Заново
              </Button>
            </div>
          </div>
        </CentralContainer>
      </Container>
    </Layout>
  );
};

export default ContinuePage;
