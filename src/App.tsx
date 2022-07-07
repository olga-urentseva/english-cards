import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthContext from "./components/contexts/AuthContext";
import ThemeContext from "./components/contexts/ThemeContext";
import MainPage from "./components/pages/MainPage";
import GamePage from "./components/pages/GamePage";
import DictionaryPage from "./components/pages/DictionaryPage";
import AboutPage from "./components/pages/AboutPage";
import LanguageSelectionPage from "./components/pages/LanguageSelectionPage";
import AppManagerContext from "./components/contexts/AppManagerContext";

const App = () => {
  return (
    <ThemeContext>
      <AppManagerContext>
        <AuthContext>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/dictionary" element={<DictionaryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/languages" element={<LanguageSelectionPage />} />
          </Routes>
        </AuthContext>
      </AppManagerContext>
    </ThemeContext>
  );
};

export default App;
