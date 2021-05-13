import React from "react";
import { Route } from "react-router-dom";
import AuthContext from "./components/contexts/AuthContext";
import ThemeContext from "./components/contexts/ThemeContext";
import MainPage from "./components/pages/MainPage";
import GamePage from "./components/pages/GamePage";
import DictionaryPage from "./components/pages/DictionaryPage";

const App = () => {
  return (
    <ThemeContext>
      <AuthContext>
        <Route path="/" exact component={MainPage} />
        <Route path="/game" exact component={GamePage} />
        <Route path="/dictionary" exact component={DictionaryPage} />
      </AuthContext>
    </ThemeContext>
  );
};

export default App;
