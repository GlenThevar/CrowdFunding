import React, { useState } from "react";
import { Search } from "lucide-react";
import { useContext } from "react";

import { AppContext } from "../../../context/AppContext";

const SearchNav = () => {
  const { theme } = useContext(AppContext);

  const [search, setSearch] = useState("");

  const HandleInput = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div
        className={`flex border-1 border-base-300 p-2 rounded-lg ${
          theme == "black" ? "bg-base-300" : "bg-base-200"
        } `}
      >
        <Search className="mr-4" />
        <input
          type="search"
          className="focus:outline-0  
         [&::-webkit-search-cancel-button]:appearance-none 
         [&::-webkit-search-decoration]:appearance-none 
         [&::-webkit-search-results-button]:appearance-none 
         [&::-webkit-search-results-decoration]:appearance-none w-full md:w-[40vw] lg:w-[50vw]"
          placeholder="Search for a specific campaign..."
          value={search}
          onChange={HandleInput}
        />
      </div>
    </div>
  );
};

export default SearchNav;
