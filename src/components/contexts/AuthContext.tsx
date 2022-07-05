import React, { useContext, useEffect, useState, ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import { useAppManager } from "./AppManagerContext";

export const Context = React.createContext(null);

const AuthContext = ({ children }: { children: ReactElement }) => {
  const [userName, setUserName] = useState(
    () => window.localStorage.getItem("userName") || null
  );

  const navigate = useNavigate();
  const appManager = useAppManager();

  function logOut() {
    setUserName(null);
    appManager.removeGameSave();
    navigate("/");
  }

  useEffect(() => {
    if (!userName) {
      window.localStorage.removeItem("userName");
    } else {
      window.localStorage.setItem("userName", userName);
    }
  }, [userName]);

  const isAuth = Boolean(userName);

  return (
    <Context.Provider value={{ userName, login: setUserName, logOut, isAuth }}>
      {children}
    </Context.Provider>
  );
};

export function useAuthContext() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error(
      "useAuthContext function can not be used outside of AuthContext"
    );
  }
  return contextValue;
}

export default AuthContext;
