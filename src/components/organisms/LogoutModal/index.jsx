import React from "react";
import Modal from "../../atoms/Modal";
import Button, { BUTTON_TYPES } from "../../atoms/Button";

import classes from "./style.css";
import { useAuthContext } from "../../contexts/AuthContext";

const LogoutModal = ({ close, isShown }) => {
  const authContextValue = useAuthContext();

  function logoutHandle() {
    authContextValue.logOut();
  }

  return (
    <Modal close={close} isShown={isShown}>
      <span>При выходе будет утерян твой счёт. Действительно выйти?</span>
      <div className={classes.ButtonsWrapper}>
        <Button
          onClick={logoutHandle}
          className={classes.ContinueModalBtn}
          btntype={BUTTON_TYPES.SUCCESS}
        >
          Да
        </Button>
        <Button
          className={classes.ContinueModalBtn}
          btntype={BUTTON_TYPES.ERROR}
          onClick={close}
        >
          Нет
        </Button>
      </div>
    </Modal>
  );
};

export default LogoutModal;
