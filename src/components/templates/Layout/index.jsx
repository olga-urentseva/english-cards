import React from "react";
import Container from "../../atoms/Container";
import Header from "../../organisms/Header";

import classes from "./style.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={classes.Main}>{children}</main>
    </>
  );
};

export default Layout;
