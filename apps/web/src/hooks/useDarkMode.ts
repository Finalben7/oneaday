import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const userPref = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return userPref ? "dark" : "light";
    }
    return "dark"; // fallback
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return { theme, toggleTheme };
}