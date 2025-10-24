import React, { useState } from "react";

import { AppContext } from "./AppContext";
import { useEffect } from "react";

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("black");
  const [userId, setUserId] = useState("");

  const [searchingByTags, SetSearchingByTags] = useState(false);
  const [tagsToSearch, setTagsToSearch] = useState("");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme == "black" ? "lemonade" : "black"));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        userId,
        setUserId,
        searchingByTags,
        SetSearchingByTags,
        setTagsToSearch,
        tagsToSearch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
