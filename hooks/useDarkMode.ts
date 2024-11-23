import { useContext, useEffect, useState } from "react";
import { StateContext } from "../context/StatesContext";

export const useDarkMode = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useDarkMode must be used within a StatesContextProvider");
  }

  const { setCurrentTheme } = context;
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
      setIsMounted(true);
      root.classList.add(theme);
    } else {
      root.classList.toggle("dark", theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme, isMounted]);

  return {
    theme,
    toggleTheme: () => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      setCurrentTheme(newTheme); // Now setting the new theme value instead of the current one
    },
  };
};

// export const useDarkMode = () => {
//   const [theme, setTheme] = useState<"light" | "dark">(
//     () =>
//       (typeof window !== "undefined" &&
//         (localStorage.getItem("theme") as "light" | "dark")) ||
//       "light"
//   );

//   useEffect(() => {
//     const root = window.document.documentElement;
//     const isDark = theme === "dark";

//     root.classList.toggle("dark", isDark);
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(theme === "dark" ? "light" : "dark");
//   };

//   return { theme, toggleTheme };
// };
