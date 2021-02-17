import { set } from "core-js/fn/dict";
import React from "react";
import { useTheme, Themes } from "../../contexts/ThemeContext";
import classNames from "classnames";

import classes from "./style.css";

const ToggleButton = ({ className }) => {
  console.log(
    document.documentElement.style.getPropertyValue(`--color-background`)
  );
  const { themeName, setTheme } = useTheme();

  console.log(themeName);

  function handleChange(e) {
    const futureValue = e.target.checked;
    setTheme(futureValue ? Themes.DARK : Themes.LIGHT);
  }

  return (
    <input
      type="checkbox"
      checked={themeName === Themes.DARK}
      onChange={handleChange}
      className={classNames(classes.ToggleButton, className)}
    />
  );
};

export default ToggleButton;
