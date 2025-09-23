import React, { useContext } from "react";
import { CircleUser, Users } from "lucide-react";

import { AppContext } from "../../context/AppContext";

const Avatar = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className="avatar rounded-full  cursor-pointer dropdown dropdown-bottom dropdown-end">
      <div className="w-9 sm:w-12 rounded-full hover:border-2" tabIndex={0}>
        <img src="https://img.daisyui.com/images/profile/demo/batperson@192.webp" />
      </div>
      <ul
        tabIndex={0}
        className={`dropdown-content menu rounded-lg z-1 mt-2 w-40 lg:w-52 p-2 shadow-sm ${
          theme == "black" ? "bg-base-300" : "bg-base-100"
        }`}
      >
        <li>
          <div className="flex justify-start items-center rounded-lg">
            <CircleUser />
            <p className="font-m">Profile</p>
          </div>
        </li>
        <li>
          <div className="flex justify-start items-center rounded-lg">
            <Users />
            <p className="font-m">Community</p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
