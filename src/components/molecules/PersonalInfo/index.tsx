import React from "react";
import classNames from "classnames";

import classes from "./style.css";

type PersonalInfoProps = {
  userName: string | number;
  userScore: number;
  className: string;
};

const PersonalInfo = ({
  userName,
  userScore,
  className,
}: PersonalInfoProps) => {
  return (
    <div className={classNames(classes.PersonalCardWrapper, className)}>
      <h3 className={classes.PersonalText}>{userName}, твой счёт:</h3>
      <h1 className={classes.PersonalScore}>{userScore}</h1>
    </div>
  );
};

export default PersonalInfo;
