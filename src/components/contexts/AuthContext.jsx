import React, { useContext, useEffect, useState } from "react";

const Context = React.createContext(null);

const AuthContext = ({ children }) => {
  const [userName, setUserName] = useState(
    () => window.localStorage.getItem("userName") || null
  );

  function logOut() {
    setUserName(null);
  }

  useEffect(() => {
    if (!userName) {
      window.localStorage.removeItem("userName");
    } else {
      window.localStorage.setItem("userName", userName);
    }
  }, [userName]);

  return (
    <Context.Provider value={{ userName, setUserName, logOut }}>
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
