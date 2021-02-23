import React from "react";
import Container from "../../atoms/Container";
import MainContainer from "../../atoms/MainContainer";
import GameBlock from "../../organisms/GameBlock";
import Layout from "../../templates/Layout";

const GamePage = () => {
  return (
    <Layout>
      <Container>
        <GameBlock />
      </Container>
    </Layout>
  );
};

export default GamePage;
