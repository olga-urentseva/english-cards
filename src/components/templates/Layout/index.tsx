import React, { ReactElement } from "react";
import Footer from "../../organisms/Footer";
import Header from "../../organisms/Header";

import classes from "./style.css";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <main className={classes.Main}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
