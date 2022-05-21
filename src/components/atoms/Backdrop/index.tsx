import React from "react";
import classNames from "classnames";

import classes from "./style.css";

type BackdropProps = {
  close: (e: React.MouseEvent) => void;
  isShown: boolean;
};

const Backdrop = ({ close, isShown }: BackdropProps) => {
  return (
    <div
      className={classNames(classes.Backdrop, {
        [classes.BackdropShown]: isShown,
      })}
      onClick={close}
    ></div>
  );
};

export default Backdrop;
