import React from "react";
import Container from "../../atoms/Container";
import Header from "../../organisms/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Container>
        <Header />
        {children}
      </Container>
    </>
  );
};

export default Layout;
