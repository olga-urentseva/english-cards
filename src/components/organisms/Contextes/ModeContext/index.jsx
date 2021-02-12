import React, { useContext, useState } from "react";
import { context } from "../../../../../webpack.config";

const Context = React.createContext(null);

const ModeContext = ({ children }) => {
  const [colorMode, useColorMode] = useState("light");
  return (
    <Context.Provider value={{ colorMode, useColorMode }}>
      {children}
    </Context.Provider>
  );
};

export function useMode() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error("useMode cannot be used outside of ModeContext");
  }
  return contextValue;
}

export default ModeContext;
