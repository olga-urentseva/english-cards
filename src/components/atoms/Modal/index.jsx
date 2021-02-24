import React from "react";
import Backdrop from "../Backdrop";
import classes from "./style.css";

const Modal = ({ heading, children, close, ...otherProps }) => {
  return (
    <>
      <Backdrop close={close} />

      <div className={classes.Modal} {...otherProps}>
        <button className={classes.ModalCloseBtn} onClick={close} />
        <div className={classes.ModalContent}>{children}</div>
      </div>
    </>
  );
};

export default Modal;
