import React, { useContext, useEffect, useState, useRef } from "react";
import { SendHorizontal, ArrowLeft } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { AppContext } from "../../../context/AppContext";

const IndivisualChat = () => {
  const { theme, userId } = useContext(AppContext);
  const { id: receiverId } = useParams();
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [chatId, setChatId] = useState(null);
  const chatEndRef = useRef(null);
  const isLg = useMediaQuery({ query: "(min-width:1024px)" });

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    console.log("Current User" + ": " + userId);
    console.log("Other User" + ": " + receiverId);
  }, [userId, receiverId]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!userId || !receiverId) return;

      try {
        const chatListRes = await axios.get(
          `http://localhost:3000/chat/list/${userId}`
        );
        const chat = chatListRes.data.data.find((c) =>
          c.participants.some((p) => p._id === receiverId)
        );

        if (chat) {
          setChatId(chat._id);

          const msgRes = await axios.get(
            `http://localhost:3000/chat/messages/${chat._id}`
          );
          setMessages(msgRes.data.data || []);
        } else {
          setMessages([]);
        }
      } catch (err) {
        console.error("Error fetching chat messages:", err);
      }
    };

    fetchMessages();
  }, [userId, receiverId]);

  const handleSend = async () => {
    if (!messageInput.trim()) return;

    try {
      const res = await axios.post(
        `http://localhost:3000/chat/send/${receiverId}`,
        {
          sender: userId,
          content: messageInput,
        }
      );

      const newMessage = {
        _id: Date.now(),
        sender: { _id: userId },
        content: messageInput,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, newMessage]);
      setMessageInput("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="relative flex flex-col h-full">
      <div
        className={`flex-shrink-0 sticky top-0 z-10 p-[23px] bg-base-100 ${
          theme === "black"
            ? "border-b-2 border-b-base-300"
            : "border-b border-b-base-200"
        }`}
      >
        <div className="flex gap-5 items-center">
          <Link to="/chat">
            <ArrowLeft strokeWidth={1} className="w-5 h-5 cursor-pointer" />
          </Link>
          <p className="font-heading font-bold text-base">Chat</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2">
        {messages.length === 0 ? (
          <div className="flex justify-center items-center h-full opacity-70 text-sm">
            No messages yet
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.sender._id === userId;
            return (
              <div
                key={msg._id}
                className={`chat ${isMe ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt={isMe ? "Me" : "User"}
                      src={
                        msg.sender.profileUrl ||
                        "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      }
                    />
                  </div>
                </div>
                <div className="chat-header font-heading text-xs">
                  {msg.sender.username || (isMe ? "You" : "User")}
                  <time className="opacity-50 ml-2 font-heading text-[10px]">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
                <div className="chat-bubble font-subheading text-xs">
                  {msg.content}
                </div>
              </div>
            );
          })
        )}
        <div ref={chatEndRef}></div>
      </div>

      <div
        className={`flex-shrink-0 sticky bottom-0 z-10 p-4 bg-base-100 ${
          theme === "black"
            ? "border-t-2 border-t-base-300"
            : "border-t border-t-base-200"
        }`}
      >
        <div
          className={`p-2 flex gap-4 rounded-sm border border-base-300 ${
            theme === "black" ? "bg-base-300" : "bg-base-200"
          }`}
        >
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="w-full font-subheading focus:outline-none resize-none bg-transparent"
            placeholder="Type a message..."
          />
          <SendHorizontal
            className="cursor-pointer hover:opacity-80"
            onClick={handleSend}
          />
        </div>
      </div>
    </div>
  );
};

export default IndivisualChat;
