import React, { useContext, useRef, ReactElement } from "react";
import AppManager from "../../core/AppManager";

export const Context = React.createContext<AppManager>(null);

const AppManagerContext = ({ children }: { children: ReactElement }) => {
  const appManagerRef = useRef<AppManager>(null);
  if (!appManagerRef.current) {
    appManagerRef.current = new AppManager();
  }

  return (
    <Context.Provider value={appManagerRef.current}>
      {children}
    </Context.Provider>
  );
};

export function useAppManager() {
  const contextValue = useContext(Context);

  if (!contextValue) {
    throw new Error(
      "useAppManager function can not be used outside of AppManagerContext"
    );
  }
  return contextValue;
}

export default AppManagerContext;
