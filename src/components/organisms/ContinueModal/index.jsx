import React from "react";
import Modal from "../../atoms/Modal";
import Button, { BUTTON_TYPES } from "../../atoms/Button";
import { useAuthContext } from "../../contexts/AuthContext";
import { useHistory } from "react-router-dom";

import classes from "./style.css";

const ContinueModal = ({ close }) => {
  const authContextValue = useAuthContext();
  const history = useHistory();

  return (
    <Modal close={close}>
      <span>
        Хочешь продолжить учить английский под именем
        {` ${authContextValue.userName}`}? Или ты можешь начать заново!
      </span>
      <div className={classes.ButtonsWrapper}>
        <Button
          className={classes.ContinueModalBtn}
          btntype={BUTTON_TYPES.SUCCESS}
          onClick={() => {
            history.push("/game");
          }}
        >
          Продолжить
        </Button>
        <Button
          className={classes.ContinueModalBtn}
          btntype={BUTTON_TYPES.DEFAULT}
          onClick={() => {
            authContextValue.logOut();
          }}
        >
          Заново
        </Button>
      </div>
    </Modal>
  );
};

export default ContinueModal;
