import React from "react";
import Backdrop from "../Backdrop";
import classes from "./style.css";

import classNames from "classnames";

const Modal = ({ heading, children, close, isShown, ...otherProps }) => {
  return (
    <>
      <Backdrop close={close} isShown={isShown} />

      <div
        className={classNames(classes.Modal, { [classes.ModalShown]: isShown })}
        {...otherProps}
      >
        <button className={classes.ModalCloseBtn} onClick={close} />
        <div className={classes.ModalContent}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
