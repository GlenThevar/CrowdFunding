import React, { useState } from "react";

import { AppContext } from "./AppContext";
import { useEffect } from "react";

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("black");
  const [userId, setUserId] = useState("");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme == "black" ? "lemonade" : "black"));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme, userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
