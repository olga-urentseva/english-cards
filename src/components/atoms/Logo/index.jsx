import React from "react";
import classNames from "classnames";

import PropTypes from "prop-types";

import classes from "./style.css";

import logoDark from "./logoDark.svg";
import logoLight from "./logoLight.svg";

import { useTheme, Themes } from "../../contexts/ThemeContext";

const logoByTheme = {
  [Themes.LIGHT]: logoDark,
  [Themes.DARK]: logoLight,
};

const Logo = ({ type }) => {
  const { themeName } = useTheme();

  const classType = `Logo--${type}`;

  return (
    <img
      className={classNames(classes.Logo, classes[classType])}
      src={logoByTheme[themeName]}
      alt="Logo"
    />
  );
};

Logo.LOGO_TYPES = {
  SMALL: "small",
  BIG: "big",
};

Logo.propTypes = {
  type: PropTypes.oneOf(Object.values(Logo.LOGO_TYPES)),
};

export default Logo;
