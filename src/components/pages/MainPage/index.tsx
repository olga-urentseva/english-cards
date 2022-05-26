import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../atoms/Button";
import Container from "../../atoms/Container";
import Input from "../../atoms/Input";
import CentralContainer from "../../atoms/CentralContainer";
import { useAuthContext } from "../../contexts/AuthContext";
import Layout from "../../templates/Layout";
import ContinuePage from "../ContinuePage";

import classes from "./style.css";

const MainPage = () => {
  const authContextValue = useAuthContext();
  const [inputValue, setInputValue] = useState("");

  const navigate = useNavigate();

  function submitForm(e: React.FormEvent) {
    e.preventDefault();
    authContextValue.login(inputValue);
    navigate("/languages");
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setInputValue(e.target.value);
  }

  if (authContextValue.isAuth) {
    return <ContinuePage />;
  }

  return (
    <Layout>
      <Container>
        <CentralContainer>
          <div className={classes.Hero}>
            <h2 className={classes.MainText}>
              Привет! Давай учить английский!
            </h2>
            <form onSubmit={submitForm} className={classes.FormWrapper}>
              <Input
                id="name"
                type="text"
                placeholder="Имя"
                className={classes.FormInput}
                onChange={handleChange}
                value={inputValue}
                maxLength={15}
              />
              <Button
                type="submit"
                btntype="success"
                className={classes.FormButton}
              >
                Начать!
              </Button>
            </form>
          </div>
        </CentralContainer>
      </Container>
    </Layout>
  );
};

export default MainPage;
