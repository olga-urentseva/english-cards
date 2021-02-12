import React from "react";
import Container from "../../atoms/Container";
import Logo from "../../atoms/Logo";

import classes from "./style.css";

const Footer = () => {
  return (
    <div className={classes.FooterWrapper}>
      <Container>
        <Logo type={Logo.LOGO_TYPES.BIG} />
      </Container>
    </div>
  );
};

export default Footer;
