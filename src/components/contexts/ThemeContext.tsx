import React, { ReactElement, useContext, useEffect, useState } from "react";
import * as themes from "../../constants/themes";

type Theme = typeof themes[keyof typeof themes];
type ThemeName = typeof ThemeNames[keyof typeof ThemeNames];

type ContextType = {
  theme: Theme;
  themeName: ThemeName;
  setTheme: (themeName: ThemeName) => void;
};

export const Context = React.createContext<ContextType>(null);

export const ThemeNames = {
  LIGHT: "light",
  DARK: "dark",
} as const;

function setCSSVariables(theme: Theme) {
  Object.entries(theme).forEach(([name, value]) => {
    document.documentElement.style.setProperty(`--${name}`, value);
  });
}

const initialThemeName = window.localStorage.getItem("theme") as ThemeName;

setCSSVariables(themes[initialThemeName || ThemeNames.LIGHT]);

const ThemeContext = ({ children }: { children: ReactElement }) => {
  const [themeName, setTheme] = useState(
    () => initialThemeName || ThemeNames.LIGHT
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

ThemeContext.Themes = ThemeNames;

export function useTheme() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error("useMode cannot be used outside of Theme");
  }
  return contextValue;
}

export default ThemeContext;
