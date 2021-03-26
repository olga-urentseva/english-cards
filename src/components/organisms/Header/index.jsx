import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Container from "../../atoms/Container";
import Logo from "../../atoms/Logo";
import LogOutButton from "../../atoms/LogOutButton";
import ToggleButton from "../../atoms/ToggleThemeButton";
import LogoutModal from "../LogoutModal";

import { useAuthContext } from "../../contexts/AuthContext";

import classes from "./style.css";

const Header = () => {
  const authContextValue = useAuthContext();
  const [isModalShown, setIsModalShown] = useState(false);

  useEffect(() => {
    function handleEscape(e) {
      if (e.keyCode === 27) {
        setIsModalShown(false);
      }
    }
    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <header>
      <LogoutModal
        isShown={isModalShown}
        close={() => {
          setIsModalShown(false);
        }}
      />
      <div className={classNames(classes.Header)}>
        <Container>
          <div className={classes.HeaderWrapper}>
            <div className={classes.LogoBlock}>
              <Link to="/">
                <Logo type={Logo.LOGO_TYPES.BIG} />
              </Link>
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
                    onClick={() => {
                      setIsModalShown(true);
                    }}
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
