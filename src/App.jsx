import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./components/contexts/AuthContext";
import ThemeContext from "./components/contexts/ThemeContext";
import MainPage from "./components/pages/MainPage";
import GamePage from "./components/pages/GamePage";
import DictionaryPage from "./components/pages/DictionaryPage";
import AboutPage from "./components/pages/AboutPage";

const App = () => {
  return (
    <ThemeContext>
      <AuthContext>
        <Routes>
          <Route path="/" exact element={<MainPage />} />
          <Route path="/game" exact element={<GamePage />} />
          <Route path="/dictionary" exact element={<DictionaryPage />} />
          <Route path="/about" exact element={<AboutPage />} />
        </Routes>
      </AuthContext>
    </ThemeContext>
  );
};

export default App;
