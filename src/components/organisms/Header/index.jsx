import classNames from "classnames";
import React from "react";
import Container from "../../atoms/Container";

import Logo from "../../atoms/Logo";

import classes from "./style.css";

const Header = () => {
  return (
    <header>
      <div className={classNames(classes.HeaderWrapper)}>
        <Container>
          <Logo type={Logo.LOGO_TYPES.BIG} />
        </Container>
      </div>
    </header>
  );
};

export default Header;
