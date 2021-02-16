import React from "react";
import { Route } from "react-router-dom";
import AuthContext from "./components/contexts/AuthContext";
import ThemeContext from "./components/contexts/ThemeContext";
import MainPage from "./components/pages/MainPage";

const App = () => {
  return (
    <ThemeContext>
      <AuthContext>
        <Route path="/" exact component={MainPage} />
      </AuthContext>
    </ThemeContext>
  );
};

export default App;
