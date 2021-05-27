import React, { useContext, useEffect, useState } from "react";
import * as themes from "../../constants/themes";

export const Context = React.createContext(null);

export const Themes = {
  LIGHT: "light",
  DARK: "dark",
};

function setCSSVariables(theme) {
  Object.entries(theme).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--${name}`, value);
  });
}

const initialThemeName = window.localStorage.getItem("theme");

setCSSVariables(themes[initialThemeName || "light"]);

const ThemeContext = ({ children }) => {
  const [themeName, setTheme] = useState(
    () => initialThemeName || Themes.LIGHT
  );
  const theme = themes[themeName];

  useEffect(() => {
    setCSSVariables(theme);
    window.localStorage.setItem("theme", themeName);
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
