import React, { ReactElement } from "react";
import { Dialog } from "@headlessui/react";
import Backdrop from "../Backdrop";
import classes from "./style.css";

import classNames from "classnames";

export type ModalProps = {
  children?: ReactElement | ReactElement[];
  close: () => void;
  isShown?: boolean;
};

const Modal = ({ children, close, isShown, ...otherProps }: ModalProps) => {
  return (
    <Dialog onClose={close} open={isShown}>
      <Backdrop close={close} isShown={isShown} />
      <div
        className={classNames(classes.Modal, { [classes.ModalShown]: isShown })}
        {...otherProps}
      >
        <button
          className={classes.ModalCloseBtn}
          onClick={close}
          name="close"
        />
        <div className={classes.ModalContent}>{children}</div>
      </div>
    </Dialog>
  );
};

export default Modal;
