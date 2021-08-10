import React from "react";
import Button from "../styles/Button";

const Theme = () => {
  const [theme, setTheme] = React.useState("light");
  React.useEffect(() => {
    document.body.dataset.theme = theme;
    document.getElementById("main-container").dataset.theme = theme;
  }, [theme]);
  return (
    <Button
      corner
      className="theme"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    ></Button>
  );
};

export default Theme;
