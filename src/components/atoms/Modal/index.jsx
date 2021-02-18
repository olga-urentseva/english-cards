import React from "react";
import Backdrop from "../Backdrop";
import classes from "./style.css";

const Modal = ({ children, close, ...otherProps }) => {
  return (
    <>
      <Backdrop close={close} />

      <div
        className={classes.Modal}
        // style={{
        //   transform: "translateY(0)" : "translateY(-100vh)",
        //   opacity: "1" : "0",
        // }}
        {...otherProps}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
