import classNames from "classnames";
import React from "react";

import Container from "../../atoms/Container";
import Logo from "../../atoms/Logo";
import LogOutButton from "../../atoms/LogOutButton";
import ToggleButton from "../../atoms/ToggleThemeButton";

import { useAuthContext } from "../../contexts/AuthContext";

import classes from "./style.css";

const Header = () => {
  const authContextValue = useAuthContext();

  return (
    <header>
      <div className={classNames(classes.Header)}>
        <Container>
          <div className={classes.HeaderWrapper}>
            <div className={classes.LogoBlock}>
              <Logo type={Logo.LOGO_TYPES.BIG} />
            </div>
            <div className={classes.ServiceBlock}>
              <ToggleButton className={classes.HeaderToggleBtn} />
              {authContextValue.userName ? (
                <div className={classes.HeaderLogOutBlock}>
                  <h3 className={classes.HeaderUserName}>
                    {authContextValue.userName}
                  </h3>
                  <LogOutButton
                    className={classes.HeaderLogOutBtn}
                    onClick={authContextValue.logOut}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
};

export default Header;
