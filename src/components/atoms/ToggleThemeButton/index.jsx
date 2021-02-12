import { set } from "core-js/fn/dict";
import React from "react";
import { useTheme, Themes } from "../../contexts/ThemeContext";

import classes from "./style.css";

const ToggleButton = () => {
  const { themeName, setTheme } = useTheme();

  function handleChange(e) {
    const futureValue = e.target.checked;
    setTheme(futureValue ? Themes.DARK : Themes.LIGHT);
  }

  return (
    <input
      type="checkbox"
      checked={themeName === Themes.DARK}
      onChange={handleChange}
      className={classes.ToggleButton}
    />
  );
};

export default ToggleButton;
