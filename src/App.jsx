import React from "react";
import { Route } from "react-router-dom";
import ThemeContext from "./components/contexts/ThemeContext";
import MainPage from "./components/pages/MainPage";

const App = () => {
  return (
    <ThemeContext>
      <Route path="/" exact component={MainPage} />
    </ThemeContext>
  );
};

export default App;
