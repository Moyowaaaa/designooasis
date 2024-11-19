import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const localTheme = localStorage.getItem("theme");
      if (localTheme) return localTheme as "light" | "dark";
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return "light";
  });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (!isMounted) {
      setIsMounted(true); // Ensure transition only happens after the initial mount
      root.classList.add(theme);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, isMounted]);

  return {
    theme,
    toggleTheme: () => setTheme(theme === "dark" ? "light" : "dark"),
  };
};
