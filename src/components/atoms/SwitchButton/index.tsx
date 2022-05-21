import * as React from "react";
import classNames from "classnames";

import classes from "./style.css";
import { boolean } from "yup";

type SwitchButtonProps = JSX.IntrinsicElements["button"] & {
  isActive: boolean;
};

const SwitchButton = ({ isActive, ...rest }: SwitchButtonProps) => {
  return (
    <button
      className={classNames(classes.SwitchButton, {
        [classes.SwitchButtonActive]: isActive,
      })}
      {...rest}
    ></button>
  );
};

export default SwitchButton;
