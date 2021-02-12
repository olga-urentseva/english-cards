import React from "react";
import ThemeContext from "./components/contexts/ThemeContext";
import Layout from "./components/templates/Layout";

const App = () => {
  return (
    <ThemeContext>
      <Layout />
    </ThemeContext>
  );
};

export default App;
