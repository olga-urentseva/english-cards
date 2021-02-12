import classNames from "classnames";
import React from "react";
import Container from "../../atoms/Container";

import Logo from "../../atoms/Logo";
import ToggleButton from "../../atoms/ToggleThemeButton";

import classes from "./style.css";

const Header = () => {
  return (
    <header>
      <div className={classNames(classes.Header)}>
        <Container>
          <div className={classes.HeaderWrapper}>
            <Logo type={Logo.LOGO_TYPES.BIG} />
            <ToggleButton />
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
