import React, { useContext } from "react";
import { Search } from "lucide-react";

import { AppContext } from "../../../context/AppContext";

const ChatSearch = () => {
  const { theme } = useContext(AppContext);
  return (
    <div className="p-4">
      <div
        className={`border-1 border-base-300 p-2 flex gap-4 rounded-sm ${
          theme == "black" ? "bg-base-300" : "bg-base-200"
        }`}
      >
        <Search />
        <input
          type="text"
          className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full font-subheading resize-none"
          placeholder={`Search...`}
        />
      </div>
    </div>
  );
};

export default ChatSearch;
