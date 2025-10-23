import React, { useContext } from "react";

import { AppContext } from "../../../context/AppContext";

const ChatItem = ({ name, profilePhoto, lastText, date }) => {
  const { theme } = useContext(AppContext);

  return (
    <div>
      <div
        className={`w-full h-20 flex items-center gap-4 p-4 hover:bg-base-200 cursor-pointer border-y-1 border-base-200`}
      >
        <div className="">
          <div
            className={`rounded-full ${
              theme == "black"
                ? "hover:border-1 border-white"
                : "hover:border-1 border-black"
            }`}
          >
            <img
              src={profilePhoto}
              className={`rounded-full w-12 hover:cursor-pointer `}
            />
          </div>
        </div>
        <div className="flex-col grow">
          <div className="flex items-center justify-between">
            <div className="font-heading text-sm">{name}</div>
            <div className="font-heading text-xs font-light">{date}</div>
          </div>
          <div>
            <div className="font-subheading text-xs font-light">{lastText}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
