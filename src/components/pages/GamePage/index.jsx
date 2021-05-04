import React from "react";
import { Redirect } from "react-router-dom";
import Container from "../../atoms/Container";
import { useAuthContext } from "../../contexts/AuthContext";
import GameBlock from "../../organisms/GameBlock";
import Layout from "../../templates/Layout";
import MainPage from "../MainPage";

const GamePage = () => {
  const authContextValue = useAuthContext();

  if (!authContextValue.isAuth) {
    <Redirect to="/" />;
    // return <MainPage />;
  }
  return (
    <Layout>
      <Container>
        <GameBlock />
      </Container>
    </Layout>
  );
};

export default GamePage;
