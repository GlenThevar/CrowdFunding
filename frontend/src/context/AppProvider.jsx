import React, { useState } from "react";

import { AppContext } from "./AppContext";

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("black");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme == "black" ? "lofi" : "black"));
  };

  return (
    <AppContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
