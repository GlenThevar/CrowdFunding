import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import ChatItem from "./ChatItem";
import ChatSearch from "./ChatSearch";
import { AppContext } from "../../../context/AppContext";

const ChatList = () => {
  const { theme, userId } = useContext(AppContext);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/chat/list/${userId}`
        );
        setChatList(res.data.data || []);
      } catch (err) {
        console.error("Error fetching chat list:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchChats();
  }, [userId]);

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
        {loading ? (
          <div className="flex justify-center font-heading items-center h-full text-sm opacity-70">
            Loading chats...
          </div>
        ) : chatList.length === 0 ? (
          <div className="flex justify-center font-heading items-center h-full text-sm opacity-70">
            No chats yet
          </div>
        ) : (
          chatList.map((chat) => {
            const otherUser = chat.participants.find((p) => p._id !== userId);
            const lastMessage = chat.lastMessage?.content || "No messages yet";
            const lastMessageDate = chat.lastMessage?.createdAt
              ? new Date(chat.lastMessage.createdAt).toLocaleDateString()
              : "";

            return (
              <Link to={`/chat/${otherUser?._id}`} key={chat._id}>
                <ChatItem
                  name={otherUser?.username || "Unknown"}
                  profilePhoto={otherUser?.profileUrl || ""}
                  lastText={lastMessage}
                  date={lastMessageDate}
                />
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ChatList;
