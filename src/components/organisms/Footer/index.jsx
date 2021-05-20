import React from "react";
import { Link } from "react-router-dom";
import Container from "../../atoms/Container";

import classes from "./style.css";

const Footer = () => {
  return (
    <footer className={classes.Footer}>
      <Container>
        <div className={classes.FooterWrapper}>
          <div className={classes.FooterLinkColumn}>
            <Link to="/about" className={classes.FooterLink}>
              About
            </Link>
            <a
              href="https://github.com/olga-urentseva"
              target="_blank"
              className={classes.FooterLink}
            >
              Author's GitHub
            </a>
          </div>

          <span className={classes.FooterAuthorTitle}>
            English Cards by Olga Urentseva — 2021
          </span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
