import React, { useContext, useEffect, useState } from "react";

const Context = React.createContext(null);

const AuthContext = ({ children }) => {
  const [userName, setUserName] = useState(
    () => window.localStorage.getItem("userName") || null
  );

  useEffect(() => {
    if (!userName) {
      return;
    } else {
      window.localStorage.setItem("userName", userName);
    }
  }, [userName]);

  return (
    <Context.Provider value={{ userName, setUserName }}>
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
