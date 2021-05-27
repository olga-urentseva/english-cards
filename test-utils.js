import React from "react";
import { render } from "@testing-library/react";
import { Context as AuthContext } from "./src/components/contexts/AuthContext";
import { Context as ThemeContext } from "./src/components/contexts/ThemeContext";
import theme from "./src/constants/themes/dark";
import { MemoryRouter } from "react-router";

const noop = () => {};

const AllProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <ThemeContext.Provider
        value={{ theme, themeName: "dark", setTheme: noop }}
      >
        <AuthContext.Provider
          value={{ userName: "test", isAuth: true, login: noop, logOut: noop }}
        >
          {children}
        </AuthContext.Provider>
      </ThemeContext.Provider>
    </MemoryRouter>
  );
};

const customRender = (ui, options) => {
  render(ui, { wrapper: AllProviders, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
