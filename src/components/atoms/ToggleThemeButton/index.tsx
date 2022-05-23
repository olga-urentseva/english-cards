import React from "react";
import { useTheme, ThemeNames } from "../../contexts/ThemeContext";
import classNames from "classnames";

import classes from "./style.css";

const ToggleButton = ({ className }: { className: string }) => {
  const { themeName, setTheme } = useTheme();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const futureValue = e.target.checked;
    setTheme(futureValue ? ThemeNames.DARK : ThemeNames.LIGHT);
  }

  return (
    <input
      type="checkbox"
      checked={themeName === ThemeNames.DARK}
      onChange={handleChange}
      className={classNames(classes.ToggleButton, className)}
    />
  );
};

export default ToggleButton;
