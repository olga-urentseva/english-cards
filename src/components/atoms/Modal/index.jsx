import React from "react";
import Backdrop from "../Backdrop";
import classes from "./style.css";

const Modal = ({ children, close, ...otherProps }) => {
  return (
    <>
      <Backdrop close={close} />

      <div className={classes.Modal} {...otherProps}>
        {children}
      </div>
    </>
  );
};

export default Modal;
