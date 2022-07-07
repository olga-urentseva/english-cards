import React from "react";
import classNames from "classnames";

import classes from "./style.css";

type Props = JSX.IntrinsicElements["a"];

const ButtonLink = ({ className, ...otherProps }: Props) => {
  return (
    <a {...otherProps} className={classNames(classes.ButtonLink, className)} />
  );
};

export default ButtonLink;
