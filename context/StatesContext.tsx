"use client";

import React, { createContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type States = {
  theme: Theme;
  showWorks: boolean;
};

export const StateContext = createContext<States | null>(null);

export const StatesContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const previousTheme = localStorage?.getItem("theme");
    if (previousTheme === "dark" || previousTheme === "light") {
      setTheme(previousTheme);
    }
  }, []);

  return (
    <StateContext.Provider value={{ theme, showWorks: false }}>
      {children}
    </StateContext.Provider>
  );
};
