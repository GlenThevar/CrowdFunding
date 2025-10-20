import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ChatItem from "./ChatItem";
import ChatSearch from "./ChatSearch";
import { AppContext } from "../../../context/AppContext";
import chatUsers from "../../../data/chatUsers";

const ChatList = () => {
  const { theme } = useContext(AppContext);

  return (
    <div className="flex flex-col h-full">
      <div
        className={`flex-shrink-0 sticky top-0 z-10 bg-base-100 ${
          theme === "black"
            ? "border-b-2 border-b-base-300"
            : "border-b border-b-base-200"
        }`}
      >
        <ChatSearch />
      </div>

      <div className="flex-1 overflow-y-auto">
        {chatUsers.map((data) => (
          <Link to={`/chat/${data.username}`} key={data.id}>
            <ChatItem
              name={data.username}
              profilePhoto={data.profilePicture}
              lastText={data.lastText}
              date={data.date}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
