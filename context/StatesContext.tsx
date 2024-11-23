"use client";

import React, {
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type States = {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void; // Add the setter function type
  showWorks: boolean;
  setShowWorks: React.Dispatch<SetStateAction<boolean>>;
};

export const StateContext = createContext<any>(null);

export const StatesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");
  const [showWorks, setShowWorks] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const previousTheme = localStorage?.getItem("theme");
    if (previousTheme === "dark" || previousTheme === "light") {
      setCurrentTheme(previousTheme);
    }
  }, []);

  return (
    <StateContext.Provider
      value={{ currentTheme, showWorks, setCurrentTheme, setShowWorks }}
    >
      {children}
    </StateContext.Provider>
  );
};
