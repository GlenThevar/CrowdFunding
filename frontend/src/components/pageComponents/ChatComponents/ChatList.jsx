import React, { useContext } from "react";

import ChatItem from "./ChatItem";
import { AppContext } from "../../../context/AppContext";
import chatUsers from "../../../data/chatUsers";
import ChatSearch from "./ChatSearch";
import { Link } from "react-router-dom";

const ChatList = () => {
  const { theme } = useContext(AppContext);
  return (
    <div>
      <div className={`overflow-y-auto h-screen flex-col`}>
        <ChatSearch />
        {chatUsers.map((data) => (
          <Link to="/chat/glen" key={data.id}>
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
