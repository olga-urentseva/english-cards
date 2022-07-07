import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router";

import { Context as ThemeContext } from "./src/components/contexts/ThemeContext";
import AppManagerContext from "./src/components/contexts/AppManagerContext";
import { Context as AuthContext } from "./src/components/contexts/AuthContext";

import theme from "./src/constants/themes/dark";

const noop = () => {};

const AllProviders = ({ children }) => {
  return (
    <MemoryRouter>
      <ThemeContext.Provider
        value={{ theme, themeName: "dark", setTheme: noop }}
      >
        <AppManagerContext>
          <AuthContext.Provider
            value={{
              userName: "test",
              isAuth: true,
              login: noop,
              logOut: noop,
            }}
          >
            {children}
          </AuthContext.Provider>
        </AppManagerContext>
      </ThemeContext.Provider>
    </MemoryRouter>
  );
};

const customRender = (ui, options) => {
  render(ui, { wrapper: AllProviders, ...options });
};

export * from "@testing-library/react";
export { customRender as render };
