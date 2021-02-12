import React, { useContext, useEffect, useState } from "react";
import * as themes from "../constants/themes";

const Context = React.createContext(null);

export const Themes = {
  LIGHT: "light",
  DARK: "dark",
};

function setCSSVariables(theme) {
  Object.entries(theme).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--${name}`, value);
  });
}

setCSSVariables(themes.light);

const ThemeContext = ({ children }) => {
  const [themeName, setTheme] = useState(Themes.LIGHT);
  const theme = themes[themeName];

  useEffect(() => {
    setCSSVariables(theme);
  }, [themeName]);

  return (
    <Context.Provider value={{ theme, themeName, setTheme }}>
      {children}
    </Context.Provider>
  );
};

ThemeContext.Themes = Themes;

export function useTheme() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error("useMode cannot be used outside of Theme");
  }
  return contextValue;
}

export default ThemeContext;
