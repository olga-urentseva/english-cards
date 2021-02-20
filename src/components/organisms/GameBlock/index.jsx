import React from "react";
import Button, { BUTTON_TYPES } from "../../atoms/Button";
import Input from "../../atoms/Input";
import WordCard from "../../atoms/WordCard";

import classes from "./style.css";

const GameBlock = () => {
  return (
    <div className={classes.GameWrapper}>
      <WordCard className={classes.GameCard} />
      <Input placeholder="Перевод" className={classes.GameInput} />
      <Button btntype={BUTTON_TYPES.SUCCESS} className={classes.GameBtn}>
        Проверить
      </Button>
      <Button btntype={BUTTON_TYPES.ERROR} className={classes.GameBtn}>
        Не знаю :(
      </Button>
    </div>
  );
};

export default GameBlock;
