import React from "react";
import Container from "../../atoms/Container";
import Header from "../../organisms/Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
