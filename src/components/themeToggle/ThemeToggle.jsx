import { useState, useEffect } from "react";
import { AiOutlineMoon } from "react-icons/ai";
import { PiSun } from "react-icons/pi";
import "./themeToggle.scss";

const ThemeToggle = () => {
  
  // Локальное состояние темы
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Синхронизация темы с HTML и localStorage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Переключение темы
  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" ? <AiOutlineMoon /> : <PiSun />}
    </button>
  );
};

export default ThemeToggle;