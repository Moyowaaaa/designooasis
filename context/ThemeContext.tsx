"use client";

import React, { createContext, useEffect, useState } from "react";

type theme = "light" | "dark";

export const ThemeContext = createContext<theme>("light");

export const ThemeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ThemeContext.Provider value={"light"}>{children}</ThemeContext.Provider>
  );
};
