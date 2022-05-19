import React, { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import GameSaveManager from "../../core/gameSaveManager";

export const Context = React.createContext(null);

const AuthContext = ({ children }) => {
  const [userName, setUserName] = useState(
    () => window.localStorage.getItem("userName") || null
  );

  const navigate = useNavigate();

  const gameSaveManagerRef = useRef(null);
  if (!gameSaveManagerRef.current) {
    gameSaveManagerRef.current = new GameSaveManager();
  }
  const gameSaveManager = gameSaveManagerRef.current;

  function logOut() {
    setUserName(null);
    gameSaveManager.removeSave();
    navigate("/");
  }

  useEffect(() => {
    if (!userName) {
      window.localStorage.removeItem("userName");
    } else {
      window.localStorage.setItem("userName", userName);
    }
  }, [userName]);

  const isAuth = userName ? true : false;

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
