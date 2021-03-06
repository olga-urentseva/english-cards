import React from "react";
import { useHistory } from "react-router-dom";

import Layout from "../../templates/Layout";
import Container from "../../atoms/Container";
import Button, { BUTTON_TYPES } from "../../atoms/Button";
import { useAuthContext } from "../../contexts/AuthContext";

import classes from "./style.css";
import CentralContainer from "../../atoms/CentralContainer";

const ContinuePage = () => {
  const authContextValue = useAuthContext();
  const history = useHistory();

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
              <Button
                className={classes.ContinuePageButton}
                btntype={BUTTON_TYPES.SUCCESS}
                onClick={() => {
                  history.push("/game");
                }}
              >
                Продолжить
              </Button>
              <Button
                className={classes.ContinuePageButton}
                btntype={BUTTON_TYPES.DEFAULT}
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
