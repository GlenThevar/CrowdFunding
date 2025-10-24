import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

import ChatItem from "./ChatItem";
import ChatSearch from "./ChatSearch";
import { AppContext } from "../../../context/AppContext";
import interestingFacts from "../../../data/interestingInfo";

const ChatList = () => {
  const { theme, userId } = useContext(AppContext);
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadCount, setLoadCount] = useState(0);

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Authentication token not found. Please log in again.");
        setLoading(false);
        return;
      }
      try {
        const res = await axios.get(
          `http://localhost:3000/chat/list/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setChatList(res.data.data || []);
      } catch (err) {
        console.error("Error fetching chat list:", err);
        toast.error(
          err.response?.data?.message || "Could not fetch chat list."
        );
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchChats();
  }, [userId]);

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (loadCount == 49) setLoadCount(0);
        else setLoadCount((prev) => prev + 1);
      }, 5000);
    }
  }, [loading]);

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
          <div className="flex flex-col gap-2 justify-center items-center mt-10">
            <span className="loading loading-ring loading-lg"></span>
            <div className="flex flex-col gap-1 items-center">
              <p className="font-heading font-semibold text-xs">
                DID YOU KNOW ?
              </p>
              <p className="font-heading text-xs">
                {interestingFacts[loadCount]}{" "}
              </p>
            </div>
          </div>
        ) : chatList.length === 0 ? (
          <div className="flex justify-center font-heading items-center h-full text-sm opacity-70">
            No chats yet
          </div>
        ) : (
          chatList.map((chat) => {
            const otherUser = chat.participants.find((p) => p._id !== userId);

            if (!otherUser) return null;

            const lastMessage = chat.lastMessage;
            const lastMessageDate = lastMessage?.createdAt
              ? new Date(lastMessage.createdAt).toLocaleDateString()
              : "";

            let lastTextDisplay = "No messages yet";
            let isUnread = false;

            if (lastMessage && lastMessage.content) {
              if (lastMessage.content.image) {
                lastTextDisplay = "Image";
              } else if (lastMessage.content.text) {
                lastTextDisplay = lastMessage.content.text;
              }

              if (lastMessage.sender && lastMessage.sender._id !== userId) {
                isUnread = lastMessage.seen === false;
              }
            }

            return (
              <Link to={`/chat/${otherUser._id}`} key={chat._id}>
                <ChatItem
                  name={otherUser.username || "Unknown"}
                  profilePhoto={otherUser.profileUrl || ""}
                  lastText={lastTextDisplay}
                  date={lastMessageDate}
                  isUnread={isUnread}
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
