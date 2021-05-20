import React from "react";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";

import classes from "./style.css";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={classes.Main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
