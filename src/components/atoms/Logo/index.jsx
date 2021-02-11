import React from "react";
import classNames from "classnames";

import PropTypes from "prop-types";

import classes from "./style.css";

import LogoDark from "../../../assets/LogoDark.svg";

const Logo = ({ type }) => {
  const classType = `Logo--${type}`;
  return (
    <div>
      <img
        className={classNames(classes.Logo, classes[classType])}
        src={LogoDark}
      />
    </div>
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
