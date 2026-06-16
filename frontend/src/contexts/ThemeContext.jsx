import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "dream-barbershop-theme";

const readInitialTheme = () => {
  if (typeof window === "undefined") return "dark";
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch (e) {
    // localStorage unavailable
  }
  // Dark is the premium brand identity — default to it unless the user opts out.
  return "dark";
};

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(readInitialTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  const setTheme = useCallback((t) => {
    setThemeState(t);
    try {
      localStorage.setItem(STORAGE_KEY, t);
    } catch (e) {
      // ignore storage errors
    }
  }, []);

  const toggleTheme = useCallback(
    () => setTheme(theme === "dark" ? "light" : "dark"),
    [theme, setTheme]
  );

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
