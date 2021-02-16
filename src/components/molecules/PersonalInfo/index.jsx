import React from "react";

const PersonalInfo = ({ userName, userScore }) => {
  return (
    <>
      <h3>
        {userName}, твой счёт: {userScore}
      </h3>
    </>
  );
};

export default PersonalInfo;
